const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "ranjithsivam16@gmail.com",
      pass: "hgzcg45446"
    }
});

const send = (to_address,product_name) => {
      const message = {
        from: 'TrackMyProduct <ranjithsivam16@gmail.com>',
        to: to_address,
        subject: `${product_name} price dropped!!!!`,
        text: 'Hello, The price you were tracking dropped to the price you were looking for. BUY THE PRODUCT NOW !!!'
    };

    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
          throw Error(err);
        } else {
          console.log(info);
        }
    });
}

module.exports = send;