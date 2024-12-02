"use client";

import { Document, Paragraph, TextRun, HeadingLevel, IParagraphOptions, Packer, AlignmentType } from "docx";
import { saveAs } from "file-saver";

function stripHtml(html: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}

function createParagraphWithBoldKey(
  text: string,
  options: Partial<IParagraphOptions & { size?: number; color?: string; italics?: boolean }> = {}
): Paragraph | null {
  const cleanText = stripHtml(text).trim();
  if (!cleanText) return null; // Skip empty paragraphs

  const [key, ...rest] = cleanText.split(":");
  const value = rest.join(":").trim();

  const textRuns = [];

  if (key) {
    textRuns.push(
      new TextRun({
        text: `${key}:`,
        bold: true,
        size: options.size || 24,
        font: "Calibri",
        color: options.color || "000000",
      })
    );
  }

  if (value) {
    textRuns.push(
      new TextRun({
        text: ` ${value}`,
        bold: false,
        size: options.size || 24,
        font: "Calibri",
        color: options.color || "000000",
      })
    );
  }

  return new Paragraph({
    ...options,
    spacing: {
      before: options.spacing?.before || 200,
      after: options.spacing?.after || 200,
      line: 240,
      lineRule: "exact",
    },
    children: textRuns,
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

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    const elements = Array.from(tempDiv.children);

    for (const element of elements) {
      const tagName = element.tagName.toLowerCase();
      const text = element.textContent?.trim() || "";

      // Skip empty elements or elements with no meaningful content
      if (!text) continue;

      let paragraph: Paragraph | null = null;

      switch (tagName) {
        case "h1":
          paragraph = new Paragraph({
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 240, line: 240 },
            children: [
              new TextRun({
                text: stripHtml(text),
                bold: true,
                size: 36,
                font: "Calibri",
                color: "1F4E79",
              }),
            ],
          });
          break;

        case "h2":
          paragraph = new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 200, line: 240 },
            children: [
              new TextRun({
                text: stripHtml(text),
                bold: true,
                size: 28,
                font: "Calibri",
                color: "1F3864",
              }),
            ],
          });
          break;

        case "h3":
          paragraph = new Paragraph({
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 160, after: 160, line: 240 },
            children: [
              new TextRun({
                text: stripHtml(text),
                bold: true,
                size: 26,
                font: "Calibri",
                color: "1F3864",
              }),
            ],
          });
          break;

        case "ul":
        case "ol":
          Array.from(element.children).forEach((li) => {
            const listItemText = stripHtml(li.textContent || "").trim();
            if (listItemText) {
              if (listItemText.includes(":")) {
                const bulletParagraph = createParagraphWithBoldKey(listItemText, {
                  size: 24,
                  color: "000000",
                });
                if (bulletParagraph) sections[0].children.push(bulletParagraph);
              } else {
                const bulletParagraph = new Paragraph({
                  spacing: { before: 200, after: 200, line: 240 },
                  children: [
                    new TextRun({
                      text: `• ${listItemText}`,
                      size: 24,
                      font: "Calibri",
                      color: "000000",
                    }),
                  ],
                });
                if (bulletParagraph) sections[0].children.push(bulletParagraph);
              }
            }
          });
          continue;

        case "p":
        default:
          paragraph = createParagraphWithBoldKey(text, {
            size: 24,
            color: "000000",
          });
          break;
      }

      if (paragraph) sections[0].children.push(paragraph);
    }

    return new Document({
      sections,
      styles: {
        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              font: "Calibri",
            },
            paragraph: {
              spacing: { before: 0, after: 0, line: 240, lineRule: "exact" },
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error parsing content:", error);
    throw new Error("Failed to parse content");
  }
}

export async function exportToWord(htmlContent: string): Promise<void> {
  if (!htmlContent?.trim()) {
    throw new Error("No content to export");
  }

  try {
    const doc = parseContent(htmlContent);

    if (!doc) {
      throw new Error("Failed to create document");
    }

    const filename = `transcript-analysis-${new Date().toISOString().split("T")[0]}.docx`;

    const buffer = await Packer.toBlob(doc);
    if (!buffer) {
      throw new Error("Failed to generate document buffer");
    }

    saveAs(buffer, filename);
  } catch (error) {
    console.error("Word export error:", { error });
    throw new Error(
      error instanceof Error ? error.message : "Failed to export Word document"
    );
  }
}
