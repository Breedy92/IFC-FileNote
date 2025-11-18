export const MEETING_PROMPTS = {
  initial: `<h1>Initial Meeting File Note</h1>

<p>Based on the transcript of the meeting between the financial adviser and the client, generate a detailed file note summarizing the key elements of the discussion. <b>The following file note must be generated strictly based on the content of the transcript provided. Do not make any assumptions, add inferred information, or include any details that are not explicitly mentioned in the transcript.</b></p>

<p>The file note should include the following sections:</p>

<h2>1. Meeting Details</h2>
<ul>
<li><b>Client Name</b>: Extract the clients' names by combining information from the transcript and the document title. 
<ul>
  <li>If full names are explicitly mentioned in the transcript, use those names.</li>
  <li>If only partial names (e.g., first names) are mentioned in the transcript, match them with the last names from the document title to form complete names.</li>
  <li>If no names are explicitly mentioned in the transcript, use the names from the document title verbatim. For example, if the title contains "Barry & Jill Anderson," the clients' names should appear as "Barry Anderson and Jill Anderson."</li>
</ul>
</li>
  <li><b>Client Attendance</b>: Identify all clients discussed in the meeting. Clearly indicate who was present or absent and, if applicable, include any reasons for absence provided in the transcript. Provide additional context if noted in the discussion.</li>
  <li><b>Adviser Present</b>: Identify the adviser(s) present using the following steps:
    <ul>
      <li>If the person recording the transcript is mentioned as the adviser (e.g., "Troy"), use their name as the adviser present unless otherwise specified in the transcript.</li>
      <li>If the transcript explicitly identifies the adviser by name (e.g., "Matt Katunar" or "Briannah Starkey"), replace the name with the corresponding substitute:
        <ul>
          <li>Replace "Matt Katunar" with <b>Will McEniery-Wallace</b>.</li>
          <li>Replace "Briannah Starkey" with <b>Jonathon Perna</b>.</li>
        </ul>
      </li>
      <li>If both the recorder and an adviser are mentioned, prioritize the explicitly identified adviser but still apply the substitution rule for Matt or Briannah as needed.</li>
    </ul>
    <b>Do not mention any replacement or original name; only show the final substituted names, e.g., 'Will McEniery-Wallace' or 'Jonathon Perna.'</b>
  </li>
  <li><b>Date of Meeting</b>: Extract the meeting date from the transcript and format it as DD/MM/YYYY.</li>
  <li><b>Method of Meeting</b>: Specify whether the meeting was conducted <b>"In-person"</b> or <b>"Online"</b>. Use the following rules:
    <ul>
      <li>If only one speaker is consistently identified, assume an in-person meeting where others in the room may not have been recorded.</li>
      <li>If two or more speakers are consistently identified, assume it was an online or video conference meeting.</li>
      Output either <b>"In-person"</b> or <b>"Online"</b> without any further explanation.
      </ul>
  </li>
</ul>

<h2>2. Personal Insights</h2>
<p>Note key personal details shared during the meeting to enhance future interactions, such as:</p>
<ul>
  <li><b>Life Events:</b> Milestones like weddings, family achievements, or travel plans.</li>
  <li><b>Hobbies/Interests:</b> Favorite activities, sports teams, or pastimes.</li>
  <li><b>Preferences:</b> Communication preferences or personal likes (e.g., coffee, restaurants).</li>
  <li><b>Family and Challenges:</b> Mentions of family, pets, or significant life challenges.</li>
</ul>
<p><b>Purpose:</b> Use these insights to personalize future conversations and demonstrate genuine care.</p>

<h2>2. Reason for Meeting</h2>
<p>Summarize the reason for the meeting, specifically why the clients are seeking financial advice.</p>

<h2>3. Reason for Seeking Advice</h2>
<p>Explain the clients' motivation for seeking financial advice, based on their long-term financial goals or concerns.</p>

<h2>4. Overview of Personal Situation</h2>
<p>Summarize the clients' personal information, including their professions, family details, and any other relevant personal background.</p>

<h2>5. Overview of Financial Situation</h2>
<p>Summarize the clients' financial situation, including assets, debts, and investments (e.g., mortgage, savings, superannuation).</p>

<h2>6. Goals and Objectives</h2>
<p>Identify the clients' short, medium, and long-term goals, as discussed during the meeting:</p>
<ul>
  <li><b>Short-Term Goals:</b> [Details]</li>
  <li><b>Medium-Term Goals:</b> [Details]</li>
  <li><b>Long-Term Goals:</b> [Details]</li>
</ul>

<h2>7. Summary of Discovery Meeting</h2>
<p>Provide a detailed summary of the discovery meeting, including:</p>
<ul>
  <li>The clients' reasons for seeking advice.</li>
  <li>Key financial and personal details.</li>
  <li>Discussions around their current investments, such as superannuation.</li>
  <li>Adviser recommendations or suggestions (e.g., investment strategies, insurance).</li>
  <li>Any significant advice provided during the meeting, such as the discussion of different financial products or strategies.</li>
</ul>

<h2>8. Fee Details</h2>
<p>Include the adviser's fee structure if discussed (e.g., fee for the Statement of Advice or ongoing service fees).</p>

<h2>9. Action Items and Next Steps</h2>
<p>Summarize the next steps with clear responsibilities:</p>
<ul>
  <li><b>Tasks for Clients:</b>
    <ul>
      <li>Summarize any actions the clients need to complete, such as providing additional documents or reviewing specific details.</li>
      <li>Be specific about deadlines or required outcomes.</li>
    </ul>
  </li>
  <li><b>Tasks for Adviser:</b>
    <ul>
      <li>Clearly outline any tasks the adviser must undertake, such as reviewing the client's documents, conducting additional research, or preparing materials for the next meeting.</li>
      <li>Specify deadlines where applicable.</li>
    </ul>
  </li>
</ul>

<p><b>Ensure that each section is clearly separated and formatted appropriately for a professional financial planning file note.</b></p>
<p><b>Include any specific terms or suggestions made by the adviser during the meeting.</b></p>
<p><b>Ensure that every point in the file note is directly and explicitly based on the transcript. Do not infer or assume information that is not clearly stated by the adviser or the client during the meeting.</b></p>

<p><b>Formatting requirements for your response:</b> 
Return the file note in <b>Markdown only</b> (no HTML tags in your response) using the following rules:
<ul>
  <li>Use <code># </code> for the main title.</li>
  <li>Use <code>## </code> for section headings (for example: <code>## 1. Meeting Details</code>).</li>
  <li>Use <code>### </code> for any sub-headings.</li>
  <li>Use bullet lists with <code>* </code> at the start of each bullet point.</li>
</ul>
Do not use hyphen bullets (<code>- </code>) or HTML headings in your response; use Markdown syntax only.
</p>
`,

  strategy: `<h1>Strategy Presentation Meeting File Note</h1>

  <p>Based on the transcript of the strategy meeting between the financial adviser and the client, generate a highly detailed file note summarizing every key element of the discussion. The following file note must be generated strictly based on the content of the transcript provided. <b>Do not make any assumptions, add inferred information, or include any details that are not explicitly mentioned in the transcript.</b></p>
  
  <p>The file note should include the following sections:</p>
  
  <h2>1. Meeting Details</h2>
<ul>
<li><b>Client Name</b>: Extract the clients' names by combining information from the transcript and the document title. 
<ul>
  <li>If full names are explicitly mentioned in the transcript, use those names.</li>
  <li>If only partial names (e.g., first names) are mentioned in the transcript, match them with the last names from the document title to form complete names.</li>
  <li>If no names are explicitly mentioned in the transcript, use the names from the document title verbatim. For example, if the title contains "Barry & Jill Anderson," the clients' names should appear as "Barry Anderson and Jill Anderson."</li>
</ul>
</li>
  <li><b>Client Attendance</b>: Identify all clients discussed in the meeting. Clearly indicate who was present or absent and, if applicable, include any reasons for absence provided in the transcript. Provide additional context if noted in the discussion.</li>
  <li><b>Adviser Present</b>: Identify the adviser(s) present using the following steps:
    <ul>
      <li>If the person recording the transcript is mentioned as the adviser (e.g., "Troy"), use their name as the adviser present unless otherwise specified in the transcript.</li>
      <li>If the transcript explicitly identifies the adviser by name (e.g., "Matt Katunar" or "Briannah Starkey"), replace the name with the corresponding substitute:
        <ul>
          <li>Replace "Matt Katunar" with <b>Will McEniery-Wallace</b>.</li>
          <li>Replace "Briannah Starkey" with <b>Jonathon Perna</b>.</li>
        </ul>
      </li>
      <li>If both the recorder and an adviser are mentioned, prioritize the explicitly identified adviser but still apply the substitution rule for Matt or Briannah as needed.</li>
    </ul>
    <b>Do not mention any replacement or original name; only show the final substituted names, e.g., 'Will McEniery-Wallace' or 'Jonathon Perna.'</b>
  </li>
  <li><b>Date of Meeting</b>: Extract the meeting date from the transcript and format it as DD/MM/YYYY.</li>
  <li><b>Method of Meeting</b>: Specify whether the meeting was conducted <b>"In-person"</b> or <b>"Online"</b>. Use the following rules:
    <ul>
      <li>If only one speaker is consistently identified, assume an in-person meeting where others in the room may not have been recorded.</li>
      <li>If two or more speakers are consistently identified, assume it was an online or video conference meeting.</li>
      Output either <b>"In-person"</b> or <b>"Online"</b> without any further explanation.
      </ul>
  </li>
</ul>

<h2>2. Personal Insights</h2>
<p>Note key personal details shared during the meeting to enhance future interactions, such as:</p>
<ul>
  <li><b>Life Events:</b> Milestones like weddings, family achievements, or travel plans.</li>
  <li><b>Hobbies/Interests:</b> Favorite activities, sports teams, or pastimes.</li>
  <li><b>Preferences:</b> Communication preferences or personal likes (e.g., coffee, restaurants).</li>
  <li><b>Family and Challenges:</b> Mentions of family, pets, or significant life challenges.</li>
</ul>
<p><b>Purpose:</b> Use these insights to personalize future conversations and demonstrate genuine care.</p>

  <h2>2. Reason for Meeting</h2>
  <p>Provide a detailed summary of why the meeting was held. Explain the context for presenting the financial strategy, including specific client objectives and concerns discussed in the meeting.</p>
  
  <h2>3. Overview of Presented Strategy</h2>
  <p>Summarize the financial strategy presented by the adviser in detail, including:</p>
  <ul>
    <li>All investment recommendations and why they were suggested.</li>
    <li>Tax strategies and their intended benefits.</li>
    <li>Insurance recommendations and how they align with client needs.</li>
    <li>Risk management suggestions, including specific methods to mitigate identified risks.</li>
  </ul>
  <p>For each strategy, also include:</p>
  <ul>
    <li><b>Reasons:</b> Why the recommendation was made and how it aligns with client goals.</li>
    <li><b>Risks:</b> Specific risks associated with each recommendation and how they were addressed.</li>
    <li><b>Alternatives:</b> Other strategies or products considered but not recommended, and the reasons for excluding them.</li>
  </ul>
  
  <h2>4. Client's Feedback and Agreement</h2>
  <p>Provide a comprehensive summary of client feedback on the presented strategy, including:</p>
  <ul>
    <li>All requests for amendments or additional information.</li>
    <li>Concerns raised by the client, with detailed responses from the adviser.</li>
    <li>Specific agreements or disagreements to proceed with the recommendations.</li>
  </ul>
  
  <h2>5. Risk Profile</h2>
  <ul>
    <li><b>If the Risk Profile Questionnaire was Completed During the Meeting:</b>
      <ul>
        <li>Indicate that the risk profile questionnaire was completed.</li>
        <li>Provide a detailed summary of the results (e.g., conservative, balanced, or aggressive investor).</li>
        <li>Summarize any discussion about how the agreed risk profile influenced the strategy, including any changes made based on the identified risk tolerance.</li>
      </ul>
    </li>
    <li><b>If the Risk Profile Questionnaire was Not Completed:</b>
      <ul>
        <li>Explicitly state that the risk profile questionnaire was not completed during the meeting.</li>
        <li>Summarize any discussions around risk tolerance, such as client preferences for aggressive vs. conservative investment strategies, and any verbal agreement the client may have given regarding their general risk profile.</li>
      </ul>
    </li>
  </ul>
  
  <h2>6. Fee Structure</h2>
  <p>Provide highly detailed information on all fees discussed during the meeting:</p>
  <ul>
    <li><b>One-off Fee:</b>
      <ul>
        <li>State the exact amount if disclosed.</li>
        <li>Summarize what was mentioned if the fee was not yet finalized (e.g., "To be confirmed after strategy review").</li>
      </ul>
    </li>
    <li><b>Ongoing Fees:</b> Include details of ongoing service fees (e.g., annual percentage fees for portfolio management).</li>
    <li><b>Product-Related Fees:</b> Mention any fees tied to specific recommendations, such as insurance premiums or investment management fees.</li>
  </ul>
  
  <h2>7. Client Questions and Adviser Responses</h2>
  <p>List every significant question raised by the clients during the meeting. For each question, summarize:</p>
  <ul>
    <li><b>Question:</b> The client's exact question or concern.</li>
    <li><b>Response:</b> The adviser's detailed response or solution.</li>
  </ul>
  
  <h2>8. Action Items and Next Steps</h2>
  <p>Provide an exhaustive list of next steps, broken down as follows:</p>
  <ul>
    <li><b>Tasks for Clients:</b> Include all tasks clients need to complete, such as providing documents, confirming decisions, or reviewing recommendations.</li>
    <li><b>Tasks for Adviser:</b> Detail every task for the adviser, including deadlines where applicable. Examples include:
      <ul>
        <li>Preparing additional analysis or revised recommendations.</li>
        <li>Conducting further research on specific client queries.</li>
        <li>Scheduling follow-up meetings.</li>
      </ul>
    </li>
  </ul>
  
  <p><b>Ensure that every section is detailed and exhaustive, and formatted professionally for a financial planning file note.</b></p>
  <p><b>Replace adviser names "Matt Katunar" with "Will McEniery-Wallace" and "Briannah Starkey" with "Jonathon Perna" where applicable, without indicating any replacement.</b></p>
  <p><b>Ensure that every point in the file note is directly and explicitly based on the transcript. Do not infer or assume information that is not clearly stated by the adviser or the client during the meeting.</b></p>

<p><b>Formatting requirements for your response:</b> 
Return the file note in <b>Markdown only</b> (no HTML tags in your response) using the following rules:
<ul>
  <li>Use <code># </code> for the main title.</li>
  <li>Use <code>## </code> for section headings (for example: <code>## 1. Meeting Details</code>).</li>
  <li>Use <code>### </code> for any sub-headings.</li>
  <li>Use bullet lists with <code>* </code> at the start of each bullet point.</li>
</ul>
Do not use hyphen bullets (<code>- </code>) or HTML headings in your response; use Markdown syntax only.
</p>
  `,

  annual: `<h1>Annual Review Meeting File Note</h1>

<p>Based on the transcript of the annual review meeting between the financial adviser and the client, generate a highly detailed and professional file note summarizing the key elements of the discussion. The following file note must adhere strictly to the content of the transcript provided. <b>Do not make any assumptions, add inferred information, or include any details that are not explicitly mentioned in the transcript.</b></p>

<p>The file note should include the following detailed sections:</p>

<h2>1. Meeting Details</h2>
<ul>
<li><b>Client Name</b>: Extract the clients' names by combining information from the transcript and the document title. 
<ul>
  <li>If full names are explicitly mentioned in the transcript, use those names.</li>
  <li>If only partial names (e.g., first names) are mentioned in the transcript, match them with the last names from the document title to form complete names.</li>
  <li>If no names are explicitly mentioned in the transcript, use the names from the document title verbatim. For example, if the title contains "Barry & Jill Anderson," the clients' names should appear as "Barry Anderson and Jill Anderson."</li>
</ul>
</li>
  <li><b>Client Attendance</b>: Identify all clients discussed in the meeting. Clearly indicate who was present or absent and, if applicable, include any reasons for absence provided in the transcript. Provide additional context if noted in the discussion.</li>
  <li><b>Adviser Present</b>: Identify the adviser(s) present using the following steps:
    <ul>
      <li>If the person recording the transcript is mentioned as the adviser (e.g., "Troy"), use their name as the adviser present unless otherwise specified in the transcript.</li>
      <li>If the transcript explicitly identifies the adviser by name (e.g., "Matt Katunar" or "Briannah Starkey"), replace the name with the corresponding substitute:
        <ul>
          <li>Replace "Matt Katunar" with <b>Will McEniery-Wallace</b>.</li>
          <li>Replace "Briannah Starkey" with <b>Jonathon Perna</b>.</li>
        </ul>
      </li>
      <li>If both the recorder and an adviser are mentioned, prioritize the explicitly identified adviser but still apply the substitution rule for Matt or Briannah as needed.</li>
    </ul>
    <b>Do not mention any replacement or original name; only show the final substituted names, e.g., 'Will McEniery-Wallace' or 'Jonathon Perna.'</b>
  </li>
  <li><b>Date of Meeting</b>: Extract the meeting date from the transcript and format it as DD/MM/YYYY.</li>
  <li><b>Method of Meeting</b>: Specify whether the meeting was conducted <b>"In-person"</b> or <b>"Online"</b>. Use the following rules:
    <ul>
      <li>If only one speaker is consistently identified, assume an in-person meeting where others in the room may not have been recorded.</li>
      <li>If two or more speakers are consistently identified, assume it was an online or video conference meeting.</li>
    </ul>
  </li>
</ul>

<h2>2. Personal Insights</h2>
<p>Note key personal details shared during the meeting to enhance future interactions, such as:</p>
<ul>
  <li><b>Life Events:</b> Milestones like weddings, family achievements, or travel plans.</li>
  <li><b>Hobbies/Interests:</b> Favorite activities, sports teams, or pastimes.</li>
  <li><b>Preferences:</b> Communication preferences or personal likes (e.g., coffee, restaurants).</li>
  <li><b>Family and Challenges:</b> Mentions of family, pets, or significant life challenges.</li>
</ul>
<p><b>Purpose:</b> Use these insights to personalize future conversations and demonstrate genuine care.</p>

<h2>2. Reason for Meeting</h2>
<p>Summarize the purpose of the meeting based on the transcript. This should highlight the review of the client's financial situation, portfolio performance, and any strategy adjustments discussed. Clearly articulate the specific goals or objectives the adviser and client sought to achieve during the meeting.</p>

<h2>3. Review of Performance and Changes</h2>
<ul>
  <li><b>Portfolio Performance</b>: Provide a detailed summary of the performance of the client's portfolio or financial strategy over the past year. Include specific details such as:
    <ul>
      <li>Performance metrics (e.g., percentage growth, returns, or losses).</li>
      <li>Discussion of individual investments or asset classes.</li>
      <li>Any mention of underperforming or outperforming assets.</li>
    </ul>
  </li>
  <li><b>Changes Since Last Review</b>: Outline all changes to the client's financial situation, including:
    <ul>
      <li>Personal updates (e.g., change in income, new assets, liabilities, or family circumstances).</li>
      <li>External factors (e.g., market conditions or regulatory changes).</li>
      <li>Adjustments to the client's risk profile, if applicable.</li>
      <li>Specific updates to financial products (e.g., superannuation, insurance policies).</li>
    </ul>
  </li>
</ul>

<h2>4. Discussion Points</h2>
<ul>
  <li><b>Client Questions and Adviser Responses</b>: Provide a detailed summary of all questions raised by the client and the adviser's responses. Structure as follows:
    <ul>
      <li><b>Question 1:</b> [Summarize the client's question]</li>
      <li><b>Response:</b> [Summarize the adviser's response]</li>
      <li>Repeat this format for each additional question.</li>
    </ul>
  </li>
</ul>

<h2>5. New Advice or Strategies Discussed</h2>
<ul>
  <li><b>New Strategies</b>: Provide a detailed explanation of any new advice or strategies presented by the adviser. Include specific recommendations such as:
    <ul>
      <li>Investment changes or rebalancing.</li>
      <li>Updates to superannuation strategies.</li>
      <li>Tax planning or minimization strategies.</li>
    </ul>
  </li>
  <li><b>Implementation Plan</b>: Detail the agreed-upon steps for implementing the new strategies, including any tasks or responsibilities assigned to the client or adviser.</li>
  <li><b>Client Feedback</b>: Summarize the client's reaction to the new advice, including whether they agreed to proceed or requested modifications.</li>
</ul>

<h2>6. Fees and Compliance</h2>
<ul>
  <li><b>Fee Discussion</b>: Provide a thorough summary of any fee-related discussions, including:
    <ul>
      <li>Changes or uplifts to ongoing service fees.</li>
      <li>Details of any new advice fees discussed, including the amount if mentioned.</li>
    </ul>
  </li>
  <li><b>Compliance and Documentation</b>: Summarize any compliance-related matters discussed, such as:
    <ul>
      <li>Fee disclosure statements (FDS).</li>
      <li>Service agreements or ongoing fee arrangements.</li>
    </ul>
  </li>
  <li><b>Documents Signed</b>: List all documents signed during the meeting, including their purpose (e.g., FDS, service agreement, or new investment instructions).</li>
</ul>

<h2>7. Next Steps</h2>
<ul>
  <li><b>Client Actions</b>: Provide a detailed list of tasks assigned to the client, including deadlines if specified. Examples might include reviewing documents, providing additional information, or signing forms.</li>
  <li><b>Adviser Actions</b>: Clearly outline tasks for the adviser, such as:
    <ul>
      <li>Preparing additional documents.</li>
      <li>Conducting further research.</li>
      <li>Scheduling follow-up meetings.</li>
    </ul>
    Include deadlines or timeframes for each task if mentioned.
  </li>
</ul>

<h2>8. Additional Notes</h2>
<ul>
  <li><b>Key Areas Identified</b>: Highlight any critical concerns, opportunities, or observations, such as:
    <ul>
      <li>Progress toward financial goals.</li>
      <li>Potential updates to estate planning or insurance coverage.</li>
      <li>Any legal or compliance-related topics discussed (e.g., power of attorney, wills).</li>
    </ul>
  </li>
  <li><b>Follow-up Requirements</b>: Specify any required follow-ups, such as further meetings or additional analysis, and provide context for their importance.</li>
</ul>

<p><b>Ensure that each section is fully detailed, formatted professionally, and based explicitly on the transcript. Do not infer or assume any information not clearly stated during the meeting.</b></p>

<p><b>Formatting requirements for your response:</b> 
Return the file note in <b>Markdown only</b> (no HTML tags in your response) using the following rules:
<ul>
  <li>Use <code># </code> for the main title.</li>
  <li>Use <code>## </code> for section headings (for example: <code>## 1. Meeting Details</code>).</li>
  <li>Use <code>### </code> for any sub-headings.</li>
  <li>Use bullet lists with <code>* </code> at the start of each bullet point.</li>
</ul>
Do not use hyphen bullets (<code>- </code>) or HTML headings in your response; use Markdown syntax only.
</p>
`,

  soa: `<h1>Statement of Advice (SoA) Presentation Meeting File Note</h1>

  <p>Based on the transcript of the Statement of Advice (SoA) presentation meeting between the financial adviser and the client, generate a highly detailed and comprehensive file note summarizing every element of the discussion. The file note should capture all nuances, specific details, and exact statements made during the meeting. The following file note must be generated strictly based on the content of the transcript provided. <b>Do not make any assumptions, add inferred information, or include any details that are not explicitly mentioned in the transcript.</b></p>
  
  <p>The file note should include the following sections:</p>
  
  <h2>1. Meeting Details</h2>
<ul>
<li><b>Client Name</b>: Extract the clients' names by combining information from the transcript and the document title. 
<ul>
  <li>If full names are explicitly mentioned in the transcript, use those names.</li>
  <li>If only partial names (e.g., first names) are mentioned in the transcript, match them with the last names from the document title to form complete names.</li>
  <li>If no names are explicitly mentioned in the transcript, use the names from the document title verbatim. For example, if the title contains "Barry & Jill Anderson," the clients' names should appear as "Barry Anderson and Jill Anderson."</li>
</ul>
</li>
  <li><b>Client Attendance</b>: Identify all clients discussed in the meeting. Clearly indicate who was present or absent and, if applicable, include any reasons for absence provided in the transcript. Provide additional context if noted in the discussion.</li>
  <li><b>Adviser Present</b>: Identify the adviser(s) present using the following steps:
    <ul>
      <li>If the person recording the transcript is mentioned as the adviser (e.g., "Troy"), use their name as the adviser present unless otherwise specified in the transcript.</li>
      <li>If the transcript explicitly identifies the adviser by name (e.g., "Matt Katunar" or "Briannah Starkey"), replace the name with the corresponding substitute:
        <ul>
          <li>Replace "Matt Katunar" with <b>Will McEniery-Wallace</b>.</li>
          <li>Replace "Briannah Starkey" with <b>Jonathon Perna</b>.</li>
        </ul>
      </li>
      <li>If both the recorder and an adviser are mentioned, prioritize the explicitly identified adviser but still apply the substitution rule for Matt or Briannah as needed.</li>
    </ul>
    <b>Do not mention any replacement or original name; only show the final substituted names, e.g., 'Will McEniery-Wallace' or 'Jonathon Perna.'</b>
  </li>
  <li><b>Date of Meeting</b>: Extract the meeting date from the transcript and format it as DD/MM/YYYY.</li>
  <li><b>Method of Meeting</b>: Specify whether the meeting was conducted <b>"In-person"</b> or <b>"Online"</b>. Use the following rules:
    <ul>
      <li>If only one speaker is consistently identified, assume an in-person meeting where others in the room may not have been recorded.</li>
      <li>If two or more speakers are consistently identified, assume it was an online or video conference meeting.</li>
      Output either <b>"In-person"</b> or <b>"Online"</b> without any further explanation.
      </ul>
  </li>
</ul>

<h2>2. Personal Insights</h2>
<p>Note key personal details shared during the meeting to enhance future interactions, such as:</p>
<ul>
  <li><b>Life Events:</b> Milestones like weddings, family achievements, or travel plans.</li>
  <li><b>Hobbies/Interests:</b> Favorite activities, sports teams, or pastimes.</li>
  <li><b>Preferences:</b> Communication preferences or personal likes (e.g., coffee, restaurants).</li>
  <li><b>Family and Challenges:</b> Mentions of family, pets, or significant life challenges.</li>
</ul>
<p><b>Purpose:</b> Use these insights to personalize future conversations and demonstrate genuine care.</p>

  <h2>2. Reason for Meeting</h2>
<p>Provide a detailed summary of the purpose of the meeting, ensuring client objectives, concerns, and the reason for presenting the SoA are thoroughly documented.</p>

<h2>3. Overview of Presented Strategy</h2>
<ul>
  <li><b>Investment Recommendations:</b>
    <ul>
      <li>List each investment product (e.g., "Netwealth Managed Fund – Balanced Portfolio") and recommended amounts.</li>
      <li>Explain the reason for each recommendation, how it aligns with the client’s goals, and associated risks.</li>
      <li>Specify any discussed fees, such as management fees or administration costs, as exact figures or percentages.</li>
    </ul>
  </li>
  <li><b>Insurance Recommendations:</b>
    <ul>
      <li>Specify coverage types (e.g., "Income Protection, Life Insurance") and recommended amounts or policy details.</li>
      <li>Document the cost of premiums and any commissions discussed.</li>
      <li>Include any exclusions, limitations, or terms highlighted.</li>
    </ul>
  </li>
  <li><b>Other Recommendations:</b> Document any additional advice (e.g., debt reduction, superannuation contributions), including exact amounts or percentages.</li>
</ul>

<h2>4. Client’s Feedback and Agreement</h2>
<ul>
  <li>Summarize any adjustments the client agreed to, including original and revised recommendations.</li>
  <li>State exact client approvals or objections.</li>
</ul>

<h2>5. Risks and Alternatives</h2>
<ul>
  <li><b>Risks:</b> Detail all risks for each recommendation and the client's level of acceptance.</li>
  <li><b>Alternatives:</b> Document alternative strategies or products considered and the reasons they were not chosen.</li>
</ul>

<h2>6. Fee Structure</h2>
<ul>
  <li><b>One-off Fees:</b> Specify exact amounts, such as preparation or implementation fees.</li>
  <li><b>Ongoing Fees:</b> Include percentages (e.g., "0.75% of portfolio value annually") and their coverage.</li>
  <li><b>Product Fees:</b> State management fees, premiums, or any additional costs.</li>
</ul>

<h2>7. Client Questions and Adviser Responses</h2>
<ul>
  <li>Document every significant client question, quoted or paraphrased, and the adviser’s response.</li>
</ul>

<h2>8. Action Items and Next Steps</h2>
<ul>
  <li><b>Adviser:</b> Document tasks with deadlines (e.g., "Send revised SoA by 15th December 2024").</li>
  <li><b>Client:</b> Include tasks and deadlines (e.g., "Provide bank account details by 10th December 2024").</li>
</ul>

<h2>9. Ongoing Service Agreement</h2>
<ul>
  <li>Detail all ongoing service arrangements, including frequency, scope, and client agreement.</li>
</ul>

<p><b>Ensure all specifics are extracted directly from the transcript, including amounts, percentages, product names, and client responses.</b></p>

<p><b>Formatting requirements for your response:</b> 
Return the file note in <b>Markdown only</b> (no HTML tags in your response) using the following rules:
<ul>
  <li>Use <code># </code> for the main title.</li>
  <li>Use <code>## </code> for section headings (for example: <code>## 1. Meeting Details</code>).</li>
  <li>Use <code>### </code> for any sub-headings.</li>
  <li>Use bullet lists with <code>* </code> at the start of each bullet point.</li>
</ul>
Do not use hyphen bullets (<code>- </code>) or HTML headings in your response; use Markdown syntax only.
</p>
`
};
