import * as config from "../config/config.js";

 const style = `
        background: #e8e8e8;
        padding: 22px;
        border-radius: 25px;
       
`;

export const emailTemplate = (email, content, replyTo, subject) => {
  return {
    Source: config.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
                   <body  style="${style}">
                    <h1>Welcome to Learning.com Website</h1>
                    ${content}
                    <p> learning.com &copy; All Rights Reserved ${new Date().getFullYear()} </p>
                    </body>
            </html>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Eueuka Learning -  ${subject} `,
      },
    },
  };
};
