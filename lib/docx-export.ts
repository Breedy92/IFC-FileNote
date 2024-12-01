'use client';

import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  IParagraphOptions,
  NumberFormat,
  Packer,
  AlignmentType,
  IRunOptions,
} from 'docx';
import { saveAs } from 'file-saver';

function stripHtml(html: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

function createParagraph(
  text: string,
  options: Partial<IParagraphOptions> = {},
  textRunOptions: IRunOptions = {}
): Paragraph {
  const cleanText = stripHtml(text);

  return new Paragraph({
    ...options,
    spacing: {
      before: 0,
      after: 0,
      line: 240,
      lineRule: 'exact',
      ...options.spacing,
    },
    children: [
      new TextRun({
        text: cleanText.trim(),
        size: 24,
        font: 'Calibri',
        ...textRunOptions,
      }),
    ],
  });
}

function parseContent(content: string): Document {
  try {
    const sections = [
      {
        properties: {},
        children: [] as Paragraph[],
      },
    ];

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    const elements = Array.from(tempDiv.children);
    let currentSection = sections[0];
    let lastWasHeading = false;

    for (const element of elements) {
      const tagName = element.tagName.toLowerCase();
      const text = element.textContent || '';

      if (!text.trim()) {
        if (!lastWasHeading) {
          currentSection.children.push(
            new Paragraph({ spacing: { before: 120, after: 0 } })
          );
        }
        continue;
      }

      lastWasHeading = false;

      switch (tagName) {
        case 'h1':
          currentSection.children.push(
            createParagraph(
              text,
              {
                heading: HeadingLevel.HEADING_1,
                spacing: {
                  before: 240,
                  after: 0,
                  line: 240,
                  lineRule: 'exact',
                },
                alignment: AlignmentType.CENTER,
              },
              {
                bold: true,
                size: 32,
                font: 'Calibri',
                color: '1F3864',
              }
            )
          );
          lastWasHeading = true;
          break;

        case 'h2':
          currentSection.children.push(
            createParagraph(
              text,
              {
                heading: HeadingLevel.HEADING_2,
                spacing: {
                  before: 200,
                  after: 0,
                  line: 240,
                  lineRule: 'exact',
                },
              },
              {
                bold: true,
                size: 28,
                font: 'Calibri',
                color: '1F3864',
              }
            )
          );
          lastWasHeading = true;
          break;

        case 'h3':
          currentSection.children.push(
            createParagraph(
              text,
              {
                heading: HeadingLevel.HEADING_3,
                spacing: {
                  before: 160,
                  after: 0,
                  line: 240,
                  lineRule: 'exact',
                },
              },
              {
                bold: true,
                size: 26,
                font: 'Calibri',
                color: '1F3864',
              }
            )
          );
          lastWasHeading = true;
          break;

        case 'ul':
        case 'ol':
          Array.from(element.children).forEach((li, index) => {
            const isOrdered = tagName === 'ol';
            currentSection.children.push(
              createParagraph(li.textContent || '', {
                ...(isOrdered
                  ? {
                      numbering: {
                        reference: 'default-numbering',
                        level: 0,
                      },
                    }
                  : {
                      bullet: { level: 0 },
                    }),
                spacing: {
                  before: 0,
                  after: 0,
                  line: 240,
                  lineRule: 'exact',
                },
                indent: { left: 720, hanging: isOrdered ? 260 : 360 },
              })
            );
          });
          break;

        case 'p':
        default:
          const hasBoldText = element.querySelector('b, strong');
          if (hasBoldText) {
            const segments: { text: string; bold: boolean }[] = [];
            Array.from(element.childNodes).forEach((node) => {
              if (node.nodeType === Node.TEXT_NODE) {
                segments.push({ text: node.textContent || '', bold: false });
              } else if (
                node.nodeType === Node.ELEMENT_NODE &&
                (node.nodeName === 'B' || node.nodeName === 'STRONG')
              ) {
                segments.push({ text: node.textContent || '', bold: true });
              }
            });

            currentSection.children.push(
              new Paragraph({
                spacing: {
                  before: 0,
                  after: 0,
                  line: 240,
                  lineRule: 'exact',
                },
                children: segments.map(
                  (segment) =>
                    new TextRun({
                      text: segment.text.trim(),
                      size: 24,
                      font: 'Calibri',
                      bold: segment.bold,
                    })
                ),
              })
            );
          } else {
            currentSection.children.push(
              createParagraph(text, {
                spacing: {
                  before: 0,
                  after: 0,
                  line: 240,
                  lineRule: 'exact',
                },
              })
            );
          }
          break;
      }
    }

    return new Document({
      sections,
      styles: {
        paragraphStyles: [
          {
            id: 'Normal',
            name: 'Normal',
            basedOn: 'Normal',
            next: 'Normal',
            quickFormat: true,
            run: {
              size: 24,
              font: 'Calibri',
            },
            paragraph: {
              spacing: { before: 0, after: 0, line: 240, lineRule: 'exact' },
            },
          },
        ],
      },
      numbering: {
        config: [
          {
            reference: 'default-numbering',
            levels: [
              {
                level: 0,
                format: NumberFormat.DECIMAL,
                text: '%1.',
                alignment: 'start',
                style: {
                  paragraph: {
                    indent: { left: 720, hanging: 260 },
                  },
                },
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error('Error parsing content:', error);
    throw new Error('Failed to parse content');
  }
}

export async function exportToWord(htmlContent: string): Promise<void> {
  if (!htmlContent?.trim()) {
    throw new Error('No content to export');
  }

  try {
    const doc = parseContent(htmlContent);

    if (!doc) {
      throw new Error('Failed to create document');
    }

    const filename = `transcript-analysis-${new Date()
      .toISOString()
      .split('T')[0]}.docx`;

    const buffer = await Packer.toBlob(doc);
    if (!buffer) {
      throw new Error('Failed to generate document buffer');
    }

    saveAs(buffer, filename);
  } catch (error) {
    console.error('Word export error:', { error });
    throw new Error(
      error instanceof Error ? error.message : 'Failed to export Word document'
    );
  }
}
