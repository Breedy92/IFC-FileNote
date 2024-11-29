export const MEETING_PROMPTS = {
  initial: `<h1>Initial Meeting File Note</h1>

<p>Based on the transcript of the meeting between the financial adviser and the client, generate a detailed file note summarizing the key elements of the discussion. <b>The following file note must be generated strictly based on the content of the transcript provided. Do not make any assumptions, add inferred information, or include any details that are not explicitly mentioned in the transcript.</b></p>

<p>The file note should include the following sections:</p>

<h2>1. Client Names</h2>
<p>Identify the clients' names mentioned in the transcript.</p>

<h2>2. Adviser Present</h2>
<p>Identify the adviser(s) present in the meeting.</p>

<h2>3. Date of Meeting</h2>
<p>Extract the date of the meeting from the transcript.</p>

<h2>4. Method of Meeting</h2>
<p>Specify how the meeting was conducted (e.g., in-person, video conference).</p>

<h2>5. Reason for Meeting</h2>
<p>Summarize the reason for the meeting, specifically why the clients are seeking financial advice.</p>

<h2>6. Reason for Seeking Advice</h2>
<p>Explain the clients' motivation for seeking financial advice, based on their long-term financial goals or concerns.</p>

<h2>7. Overview of Personal Situation</h2>
<p>Summarize the clients' personal information, including their professions, family details, and any other relevant personal background.</p>

<h2>8. Overview of Financial Situation</h2>
<p>Summarize the clients' financial situation, including assets, debts, and investments (e.g., mortgage, savings, superannuation).</p>

<h2>9. Goals and Objectives</h2>
<p>Identify the clients' short, medium, and long-term goals, as discussed during the meeting:</p>
<ul>
  <li><b>Short-Term Goals:</b> [Details]</li>
  <li><b>Medium-Term Goals:</b> [Details]</li>
  <li><b>Long-Term Goals:</b> [Details]</li>
</ul>

<h2>10. Summary of Discovery Meeting</h2>
<p>Provide a detailed summary of the discovery meeting, including:</p>
<ul>
  <li>The clients' reasons for seeking advice.</li>
  <li>Key financial and personal details.</li>
  <li>Discussions around their current investments, such as superannuation.</li>
  <li>Adviser recommendations or suggestions (e.g., investment strategies, insurance).</li>
  <li>Any significant advice provided during the meeting, such as the discussion of different financial products or strategies.</li>
</ul>

<h2>11. Fee Details</h2>
<p>Include the adviser's fee structure if discussed (e.g., fee for the Statement of Advice or ongoing service fees).</p>

<h2>12. Action Items and Next Steps</h2>
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
<p><b>Ensure that every point in the file note is directly and explicitly based on the transcript. Do not infer or assume information that is not clearly stated by the adviser or the client during the meeting.</b></p>`,

  strategy: `<h1>Strategy Presentation Meeting File Note</h1>

<p>Based on the transcript of the strategy meeting between the financial adviser and the client, generate a detailed file note summarizing the key elements of the discussion. The following file note must be generated strictly based on the content of the transcript provided. <b>Do not make any assumptions, add inferred information, or include any details that are not explicitly mentioned in the transcript.</b></p>

<p>The file note should include the following sections:</p>

<h2>1. Meeting Details</h2>
<ul>
  <li><b>Client Names:</b> Identify the clients' names mentioned in the transcript.</li>
  <li><b>Adviser Present:</b> Identify the adviser(s) present in the meeting.
    <ul>
      <li>If the adviser is identified as Matt Katunar, display the name as <b>Will McEniery-Wallace</b>.</li>
      <li>If the adviser is identified as Briannah Starkey, display the name as <b>Jonathon Perna</b>.</li>
    </ul>
    <b>Do not mention any replacement; only show Will McEniery-Wallace or Jonathon Perna as the adviser.</b>
  </li>
  <li><b>Date of Meeting:</b> Extract the date of the meeting from the transcript.</li>
  <li><b>Method of Meeting:</b> Based on the transcript, determine whether the meeting was conducted <b>in person</b> or <b>online</b>.
    <ul>
      <li>If only one speaker is consistently identified in the transcript, assume it was likely an in-person meeting.</li>
      <li>If two or more speakers are present and identified, assume it was likely an online or video conference meeting.</li>
    </ul>
    Output either <b>"In-person"</b> or <b>"Online"</b> without any further explanation.
  </li>
</ul>

<h2>2. Reason for Meeting</h2>
<p>Summarize the reason for the meeting, focusing on the presentation of the financial strategy and client feedback.</p>

<h2>3. Overview of Presented Strategy</h2>
<p>Provide a summary of the financial strategy presented by the adviser, including:</p>
<ul>
  <li>Investment recommendations</li>
  <li>Tax strategies</li>
  <li>Insurance</li>
  <li>Risk management suggestions</li>
</ul>
<p>Avoid including strategies or recommendations that were not mentioned in the transcript (e.g., if property was not discussed, do not include it).</p>

<h2>4. Client's Feedback and Agreement</h2>
<p>Summarize the client's feedback on the presented strategy, including:</p>
<ul>
  <li>Requests for amendments</li>
  <li>Concerns raised</li>
  <li>General agreement to proceed</li>
</ul>

<h2>5. Risk Profile</h2>
<ul>
  <li><b>If the Risk Profile Questionnaire was Completed During the Meeting:</b>
    <ul>
      <li>Indicate that the risk profile questionnaire was completed.</li>
      <li>Provide a summary of the results (e.g., conservative, balanced, or aggressive investor).</li>
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
<ul>
  <li><b>One-off Fee:</b>
    <ul>
      <li>If a specific one-off fee was disclosed, state the exact amount discussed.</li>
      <li>If no specific fee was disclosed, summarize what was mentioned about the fee (e.g., "The adviser indicated that the one-off fee would be clarified later" or "There was no specific fee discussed, but it was mentioned that it would be based on the final strategy implementation").</li>
    </ul>
  </li>
  <li><b>Ongoing Fees:</b> Provide details on any ongoing service fees discussed, such as for the Statement of Advice (SoA) or continued portfolio management.</li>
</ul>

<h2>7. Client Questions and Adviser Responses</h2>
<p>Identify any questions raised by the clients during the meeting. For each question, summarize the adviser's response or solution offered:</p>
<ul>
  <li><b>Question 1:</b> Summarize the client's question.</li>
  <li><b>Response:</b> Summarize the adviser's answer or solution provided.</li>
  <li>Repeat this format for additional questions as needed.</li>
</ul>

<h2>8. Action Items and Next Steps</h2>
<p>Summarize the client's agreement to proceed with the next steps. Clearly identify who is responsible for each task:</p>
<ul>
  <li><b>Statement of Advice (SoA):</b> Confirm if the client has agreed to move forward with the SoA. Specify any tasks the adviser must complete in relation to preparing the SoA, such as compiling recommendations or gathering required documents.</li>
  <li><b>Next Meeting:</b> Indicate if a follow-up meeting has been scheduled, and identify the purpose of this meeting (e.g., reviewing or finalizing the SoA). Include who is responsible for scheduling the meeting.</li>
  <li><b>Tasks for Clients:</b>
    <ul>
      <li>Summarize any actions the client needs to complete, such as providing additional documents or reviewing specific details.</li>
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

<p><b>Ensure that each section is clearly separated and formatted professionally for a financial planning file note.</b></p>
<p><b>Replace adviser names "Matt Katunar" with "Will McEniery-Wallace" and "Briannah Starkey" with "Jonathon Perna" where applicable, without indicating any replacement.</b></p>
<p><b>Ensure that every point in the file note is directly and explicitly based on the transcript. Do not infer or assume information that is not clearly stated by the adviser or the client during the meeting.</b></p>`,

  annual: `<h1>Annual Review Meeting File Note</h1>

<p>Based on the transcript of the annual review meeting between the financial adviser and the client, generate a highly detailed and professional file note summarizing the key elements of the discussion. The following file note must adhere strictly to the content of the transcript provided. <b>Do not make any assumptions, add inferred information, or include any details that are not explicitly mentioned in the transcript.</b></p>

<p>The file note should include the following detailed sections:</p>

<h2>1. Meeting Details</h2>
<ul>
  <li><b>Client Name</b>: Extract the full name of the client(s) as mentioned in the transcript. If multiple clients are involved, list all names.</li>
  <li><b>Client Attendance</b>: Identify all clients discussed in the meeting. Clearly indicate who was present or absent and, if applicable, include any reasons for absence provided in the transcript. Provide additional context if noted in the discussion.</li>
  <li><b>Adviser Present</b>: Identify the adviser(s) present. 
    <ul>
      <li>If the adviser is identified as Matt Katunar, display the name as <b>Will McEniery-Wallace</b>.</li>
      <li>If the adviser is identified as Briannah Starkey, display the name as <b>Jonathon Perna</b>.</li>
    </ul>
    <b>Do not mention any replacement or original name; only show the names Will McEniery-Wallace or Jonathon Perna.</b>
  </li>
  <li><b>Date of Meeting</b>: Extract the meeting date from the transcript and format it as DD/MM/YYYY.</li>
  <li><b>Method of Meeting</b>: Specify whether the meeting was conducted <b>"In-person"</b> or <b>"Online"</b>. Use the following rules:
    <ul>
      <li>If only one speaker is consistently identified, assume an in-person meeting where others in the room may not have been recorded.</li>
      <li>If two or more speakers are consistently identified, assume it was an online or video conference meeting.</li>
    </ul>
  </li>
</ul>

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

<p><b>Ensure that each section is fully detailed, formatted professionally, and based explicitly on the transcript. Do not infer or assume any information not clearly stated during the meeting.</b></p>`,

  soa: `<h1>Statement of Advice (SoA) Presentation Meeting File Note</h1>

<p>Based on the transcript of the Statement of Advice (SoA) presentation meeting between the financial adviser and the client, generate a detailed file note that accurately reflects the conversations and discussions that occurred. <b>The following file note must be generated strictly based on the content of the transcript provided. Do not make any assumptions, add inferred information, or include any details that are not explicitly mentioned in the transcript.</b></p>

<p>The file note should include the following sections:</p>

<h2>1. Client Names</h2>
<p>Identify the clients' names mentioned in the transcript.</p>

<h2>2. Adviser Present</h2>
<p>Identify the adviser(s) present in the meeting. Replace:</p>
<ul>
  <li><b>Matt Katunar</b> with <b>Will McEniery-Wallace</b></li>
  <li><b>Briannah Starkey</b> with <b>Jonathon Perna</b></li>
</ul>
<p><b>Do not mention any replacement; only show Will McEniery-Wallace or Jonathon Perna as the adviser.</b></p>

<h2>3. Date of Meeting</h2>
<p>Extract the date of the meeting from the transcript.</p>

<h2>4. Method of Meeting</h2>
<p>Based on the transcript, determine whether the meeting was conducted <b>in person</b> or <b>online</b>. Output either "In-person" or "Online" based on the context, without further explanation.</p>

<h2>5. Reason for Meeting</h2>
<p>Summarize that the meeting was to present the Statement of Advice (SoA) and to review the detailed recommendations with the client, explaining the rationale behind each suggestion.</p>

<h2>6. Detailed Conversations on Financial Recommendations</h2>
<p>For each recommendation, document the exact conversation and discussion between the adviser and client, capturing both the adviser's explanation and the client's responses:</p>

<h3>Investment Recommendations</h3>
<p>Detail the discussion about each investment product or portfolio, capturing why the adviser recommended it, the client's reaction, and any concerns or questions raised.</p>
<ul>
  <li><b>Example:</b> "The adviser recommended [Investment Product] due to its long-term growth potential and tax advantages. The client expressed concerns about market volatility, to which the adviser responded by explaining the risk mitigation strategy in place."</li>
</ul>

<h3>Insurance Recommendations</h3>
<p>Capture the specific conversation around any insurance recommendations, such as life insurance or income protection, and detail the reasons provided by the adviser, along with the client's thoughts or concerns.</p>
<ul>
  <li><b>Example:</b> "The adviser suggested increasing life insurance coverage based on the client's current family needs. The client questioned the cost increase, leading the adviser to explain the cost-benefit balance."</li>
</ul>

<h3>Product Recommendations</h3>
<p>Provide detailed dialogue about any specific product recommendations, including the reasoning behind choosing a product, any alternatives discussed, and the client's feedback.</p>
<ul>
  <li><b>Example:</b> "The adviser recommended switching superannuation providers to [New Product], explaining the lower fees and better performance history. The client asked how this compares to their existing product, and the adviser provided a side-by-side comparison."</li>
</ul>

<h3>Replacement of Products</h3>
<p>Detail the conversation about replacing any existing products, including the adviser's explanation for the change, the client's thoughts on whether to proceed, and any further questions or doubts expressed.</p>
<ul>
  <li><b>Example:</b> "The adviser proposed replacing [Old Product] with [New Product], citing higher returns and lower fees. The client requested more information on exit fees, to which the adviser explained the potential costs involved."</li>
</ul>

<h3>Alternative Products and Strategies Considered</h3>
<p>Document the conversation surrounding any alternative products or strategies the adviser considered but did not recommend. Include the reasons given for discounting these alternatives and any questions or concerns raised by the client.</p>
<ul>
  <li><b>Example:</b> "The adviser explained that while [Alternative Product] was considered, it was ultimately discounted due to higher risk. The client agreed with the reasoning but asked for further details on why [Alternative Strategy] wasn't selected."</li>
</ul>

<h2>7. Rationale for Each Recommendation</h2>
<p>For each recommendation, detail the reasoning given by the adviser during the conversation. This includes explaining how the recommendation aligns with the client's objectives, financial situation, and risk tolerance. Capture the client's understanding or agreement with the rationale provided.</p>
<ul>
  <li><b>Example:</b> "The adviser recommended a more aggressive investment strategy to align with the client's long-term retirement goals. The client expressed comfort with this approach after the adviser explained the potential for higher returns."</li>
</ul>

<h2>8. Risks Associated with Each Recommendation</h2>
<p>Document the specific risks discussed for each recommendation, along with the client's understanding of those risks. If the client raised concerns about the risks, note how the adviser addressed them in the conversation.</p>
<ul>
  <li><b>Example:</b> "The adviser highlighted the potential risk of short-term volatility with the investment. The client asked if this would impact their ability to withdraw funds early, and the adviser explained the liquidity options."</li>
</ul>

<h2>9. Client's Feedback and Agreement</h2>
<p>Detail the client's specific feedback and agreement (or disagreement) on each recommendation. Capture whether they raised any concerns, requested changes, or fully agreed to the presented recommendations.</p>
<ul>
  <li><b>Example:</b> "The client expressed agreement with the adviser's recommendations but asked for minor adjustments to the insurance policy. The adviser confirmed that the changes would be included in the final implementation."</li>
</ul>

<h2>10. Fees</h2>
<ul>
  <li><b>One-off Fees:</b> Capture the exact amount discussed or the adviser's explanation if the fee was not yet determined.</li>
  <ul>
    <li><b>Example:</b> "The adviser mentioned that the one-off fee for preparing the SoA would be $2,000, which the client agreed to proceed with."</li>
  </ul>
  <li><b>Ongoing Fees:</b> Document details of ongoing fees, such as portfolio management or service fees, and any questions or concerns raised by the client.</li>
  <ul>
    <li><b>Example:</b> "The client raised concerns about the ongoing 1% management fee. The adviser explained that this includes quarterly reviews and adjustments."</li>
  </ul>
  <li><b>Product-Related Costs:</b> Document any specific product fees discussed, such as insurance premiums or investment management fees, and the client's response to these costs.</li>
</ul>

<h2>11. Agreement to Proceed with Implementation</h2>
<p>Document the conversation about whether the client agreed to implement the advice in full or with amendments. Capture any modifications requested by the client and the adviser's confirmation of those changes.</p>
<ul>
  <li><b>Example:</b> "The client agreed to implement the advice but requested a minor change to the investment strategy. The adviser confirmed that this would be adjusted before implementation."</li>
</ul>

<h2>12. Ongoing Service Agreement</h2>
<p>Capture the details of the conversation regarding ongoing service arrangements, including the frequency of reviews, services provided, and the client's decision to proceed with ongoing advice.</p>
<ul>
  <li><b>Example:</b> "The client agreed to the ongoing service arrangement, which includes annual reviews and portfolio rebalancing. The adviser confirmed that the ongoing fee would be 0.75% of the portfolio value."</li>
</ul>

<h2>13. Client Questions and Adviser Responses</h2>
<p>For each question raised by the client, document the specific dialogue between the client and adviser, including the adviser's detailed response.</p>
<ul>
  <li><b>Example:</b></li>
  <ul>
    <li><b>Question:</b> "The client asked about the potential tax implications of the new investment strategy."</li>
    <li><b>Response:</b> "The adviser explained the tax benefits of the strategy, highlighting potential capital gains tax savings."</li>
  </ul>
</ul>

<h2>14. Action Items and Next Steps</h2>
<ul>
  <li><b>Tasks for Adviser:</b> Detail any actions the adviser must take to implement the recommendations or make requested amendments.</li>
  <li><b>Tasks for Clients:</b> Document any follow-up tasks the client must complete, such as providing documents or agreeing to final adjustments.</li>
  <li><b>Next Meeting:</b> Capture the details of any scheduled follow-up meetings, including the purpose and who is responsible for scheduling.</li>
</ul>

<p><b>Ensure that each section is clearly separated and formatted professionally for a financial planning file note.</b></p>
<p><b>Replace adviser names "Matt Katunar" with "Will McEniery-Wallace" and "Briannah Starkey" with "Jonathon Perna" where applicable, without indicating any replacement.</b></p>
<p><b>Ensure that every point in the file note is directly and explicitly based on the transcript. Do not infer or assume information that is not clearly stated by the adviser or the client during the meeting.</b></p>

`
};