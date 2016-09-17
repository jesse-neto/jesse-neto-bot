var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  // reconnect to Slack RTM when connection goes bad
  retry: Infinity,
  debug: false
})

// Assume single team mode if we have a SLACK_TOKEN
if (token) {
  console.log('Starting in single-team mode')
  controller.spawn({
    token: token,
    retry: Infinity
  }).startRTM(function (err, bot, payload) {
    if (err) {
      throw new Error(err)
    }

    console.log('Connected to Slack RTM')
  })
// Otherwise assume multi-team mode - setup beep boop resourcer connection
} else {
  console.log('Starting in Beep Boop multi-team mode')
  require('beepboop-botkit').start(controller, { debug: true })
}

controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!")
})

controller.hears(['hello', 'hi'], ['direct_mention'], function (bot, message) {
  bot.reply(message, 'Hello.')
})

controller.hears(['hello'], ['direct_message'], function (bot, message) {
  bot.reply(message, 'Hello.')
  bot.reply(message, 'It\'s nice to talk to you directly.')
})

controller.hears('.*', ['mention'], function (bot, message) {
  bot.reply(message, 'You really do care about me. :heart:')
})

controller.hears('help', ['direct_message', 'direct_mention'], function (bot, message) {
  var help = 'I will respond to the following messages: \n' +
      '`bot hi` for a simple message.\n' +
      '`bot attachment` to see a Slack attachment message.\n' +
      '`@<your bot\'s name>` to demonstrate detecting a mention.\n' +
      '`bot help` to see this again.'
  bot.reply(message, help)
})

controller.hears(['attachment'], ['direct_message', 'direct_mention'], function (bot, message) {
  var text = 'Beep Beep Boop is a ridiculously simple hosting platform for your Slackbots.'
  var attachments = [{
    fallback: text,
    pretext: 'We bring bots to life. :sunglasses: :thumbsup:',
    title: 'Host, deploy and share your bot in seconds.',
    image_url: 'https://storage.googleapis.com/beepboophq/_assets/bot-1.22f6fb.png',
    title_link: 'https://beepboophq.com/',
    text: text,
    color: '#7CD197'
  }]

  bot.reply(message, {
    attachments: attachments
  }, function (err, resp) {
    console.log(err, resp)
  })
})

controller.hears(['what is ecommerce', 'do you know anything about ecommerce', 'tell me about ecommerce'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'package',
  },function(err, res) {
    if (err) {
      bot.botkit.log('Failed to add emoji reaction :(',err);
    }
  });

  bot.reply(message,'By definition e-commerce refers to businesses and consumers buying and selling products online. The majority of e-commerce websites on the internet are retail stores selling products directly to the public. However there are also a proportion of online stores dedicated to business-to-business (B2B) sales or wholesale activity. E-commerce does not only refer to the selling of physical products, it can also refer to the selling of services where payments for the services are made online. As a general rule an e-commerce website is a website where a transfer of funds is completed electronically - hence e-commerce.');
});

controller.hears(['how does ecommerce','how does e-commerce'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'package',
  },function(err, res) {
    if (err) {
      bot.botkit.log('Failed to add emoji reaction :(',err);
    }
  });

  bot.reply(message,"Because there are hundreds of different products and services for consumers and the multitude of different ways these products and services can be delivered, e-commerce by its nature is varied in the way it works. In its most basic form e-commerce works as follows:\n\n"+
    ">- Consumers choose a product or service on a website\n\n"+
    ">- Consumers pay electronically on the website (online credit card transactions) or using a third party payment provider such as PayPal\n\n"+
    ">- The business owner or merchant receives the order and payment and the order is fulfilled (delivered by post, booked in for services etc)\n\n"+
    "Making payments online is completed via a secure connection to ensure that sensitive data such as credit card details and personal information are kept private.");
});

controller.hears(['help'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"I don\'t know much right now, but I\'m learning.: nerd_face: I already know the following commands:\n\n"+
    "> :one: Type `info [domain]` or `info [username]` to *get information* about a Neto customer.");
});

controller.hears(['style guide'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"Neto uses 4 main brand colours:\n\n"+
    "*Blue:* #45C0EF\n\n"+
    "*Green:* #39D3B0\n\n"+
    "*Pink:* #FC487D\n\n"+
    "*Yellow:* #FFC800\n\n"+
    "We use two main fonts, both of which are free from Google:\n\n"+
    "*Heading font:* Roboto Slab Bold, or Roboto Slab Light.\n\n"+
    "*Body font:* Open Sans (various weights)\n\n"+
    "We use Font Awesome for all branding icons.\n\n"+
    "> http://fontawesome.io/cheatsheet/");
    });

//Professional Services

controller.hears(['professional service'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"Neto currently offers the following Professional Services:\n\n"+
">>>Shipping Matrix\n\n"+
"Payment Method\n\n"+
"Data Feed\n\n"+
"Product Data\n\n"+
"Google Analytics\n\n"+
"Comparison Shopping Feeds\n\n"+
"Content Pages\n\n"+
"Product Categories\n\n"+
"Data Migration\n\n"+
"Accounting Integration\n\n"+
"Google Apps\n\n"+
"I can tell you more about Professional Services if you would like. Type `ps shipping matrix` to learn more.");
});

controller.hears(['ps shipping matrix'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"*Shipping Matrix*\n\n"+
  ">>>Our e-commerce experts will setup your shipping matrix, import your rates and configure any advanced requirements (such as specific shipping rules for specific products or customer groups).\n\n"+
  "You can find our more information here: https://www.neto.com.au/professional-services/P-15");
});

controller.hears(['ps payment method'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"This is what I know about: *Payment Method*\n\n"+
  ">>>We will configure your selected payment methods for you. You will need to supply Paypal or payment gateway account details to complete this service. We will provide details on how to setup a Paypal account and recommended payment gateway providers.\n\n"+
  "You can find our more information here: https://www.neto.com.au/professional-services/P-");
});

controller.hears(['ps data feed'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"This is what I know about: *Data Feed*\n\n"+
  ">>>We will set up custom import or export data feeds on your behalf.\n\n"+
  "You can find our more information here: https://www.neto.com.au/professional-services/P-");
});

controller.hears(['ps product data'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"This is what I know about: *Product Data*\n\n"+
  ">>>We will provide you with a .csv file spreadsheet and instructions on how to populate it with your product data. This spreadsheet will be designed specifically around your product range. Once populated, we will cross check your entries and import your products. Alternatively, if you are already using an existing e-commerce platform, or eBay store, we will migrate your products for you. Note: We will require database access to your existing e-commerce platform or eBay store to perform this service. In the case of eBay the product description you have on your eBay listings will become your web shop description. This includes any design template that exists in the description.\n\n"+
  "You can find our more information here: https://www.neto.com.au/professional-services/P-");
});

controller.hears(['ps google analytics'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"This is what I know about: *Google Analytics*\n\n"+
  ">>>Google Analytics is a free service that allows you to view detailed statistics about the visitors to your website. We will setup Google Analytics for you.\n\n"+
  "You can find our more information here: https://www.neto.com.au/professional-services/P-");
});

controller.hears(['ps comparison shopping', 'comparison shopping feeds'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"This is what I know about: *Comparison Shopping Feeds*\n\n"+
  ">>>Create feeds in required format for selected channels, Setup automatic daily refresh of feeds, Setup feed and account with CSE on your behalf.\n\n"+
  "You can find our more information here: https://www.neto.com.au/professional-services/P-");
});

controller.hears(['ps content pages'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"This is what I know about: *Content Pages & Invoice Logos*\n\n"+
  ">>>We will create your about us page and returns policy page using the data you supply. We will also link these pages to your web shop menus and add your logo to invoices and other print docs. Alternatively you can do this yourself using our easy to use content management system.\n\n"+
  "You can find our more information here: https://www.neto.com.au/professional-services/P-");
});

controller.hears(['ps product categories', 'categories'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"This is what I know about: *Product Categories*\n\n"+
  ">>>We will provide you with a .csv file spreadsheet and instructions on how to populate it with your product categories. Once populated, we will cross check your entries and import your product categories.\n\n"+
  "You can find our more information here: https://www.neto.com.au/professional-services/P-");
});

controller.hears(['ps data migration'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"This is what I know about: *Data Migration*\n\n"+
  ">>>We can transfer your products, categories, images and customer information from any e-commerce solution to Neto. To provide this service we require database access or access to your data in a flat file format (eg: csv). This service does not include migrating static content pages such as about us pages, terms and conditions etc. Static content can be added via your Neto control panel using the Neto Content Management System.\n\n"+
  "You can find our more information here: https://www.neto.com.au/professional-services/P-");
});

controller.hears(['ps accounting integration'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"This is what I know about: *Accounting Integration*\n\n"+
  ">>>We will configure your Xero, Unleashed, MYOB, Quickbooks, Vend or SAASU on your behalf.\n\n"+
  "You can find our more information here: https://www.neto.com.au/professional-services/P-");
});

controller.hears(['ps google apps'],'direct_message,direct_mention,mention',function(bot, message) {

  bot.reply(message,"This is what I know about: *Google Apps*\n\n"+
  ">>>If you are planning on having Neto host your domain name, you will need to setup email prior to going live with Neto. Neto does not manage email on behalf of its clients. Instead clients must utilise a 3rd party email service provider such as Google Apps. We can setup Google apps for email management for you as part of this service. Alternatively if you already have an email service that you use, you can continue to use this service.\n\n"+
  "You can find our more information here: https://www.neto.com.au/professional-services/P-");
});

//Professional Services

//Neto Account Information

controller.hears(['info (.*)'],'direct_message,direct_mention,mention',function(bot, message) {

  var matches = message.text.match(/info (.*)/i);
  var name = matches[1];
  var request = require('request');
  var XMLText = "<\?xml version=\"1.0\" encoding=\"utf-8\"\?><GetCustomer><Filter><Username>"+name+"</Username><OutputSelector>EmailAddress</OutputSelector><OutputSelector>Username</OutputSelector><OutputSelector>BillingAddress</OutputSelector><OutputSelector>DateOfBirth</OutputSelector><OutputSelector>UserCustom15</OutputSelector><OutputSelector>UserCustom12</OutputSelector><OutputSelector>UserCustom21</OutputSelector></Filter></GetCustomer>";

  request({
    url: "https://www.neto.com.au/do/WS/NetoAPI",
    method: "POST",
    headers: {
      "NETO_API_KEY": process.env.apikey,
      "NETOAPI_ACTION": 'GetCustomer',
      "content-type": "application/xml",
    },
    body: XMLText
  }, function (error, response, body){
    var parseString = require('xml2js').parseString;
    parseString(body, function (err, result) {
      if ('GetCustomerResponse' in result ) {
        if ('Customer' in result.GetCustomerResponse) {
          var customer = result.GetCustomerResponse.Customer[0];
          if (customer !== '') {
            var botResponse = "Here's what I know about *" +name+ "*\n\n";
            if ('BillingAddress' in customer) { botResponse = botResponse + '>>>*Company:*  '+customer.BillingAddress[0].BillCompany[0] +"\n";  }
            if ('Username' in customer) { botResponse = botResponse +       '*Username:*  ' + customer.Username[0] +"\n";  }
            if ('EmailAddress' in customer) { botResponse = botResponse +   '*Email Address:*  ' + customer.EmailAddress[0] +"\n";  }
            if ('BillingAddress' in customer) { botResponse = botResponse + '*Contact:*  ' + customer.BillingAddress[0].BillFirstName[0] +' '+ customer.BillingAddress[0].BillLastName[0]+"\n";  }
            if ('BillingAddress' in customer) { botResponse = botResponse + '*Phone:*  '+  customer.BillingAddress[0].BillPhone[0] + "\n";  }
            if ('DateOfBirth' in customer) { botResponse = botResponse +    '*Date Of Birth*:  '  + customer.DateOfBirth[0] + "\n";  }
            if ('UserCustom15' in customer) { botResponse = botResponse +   '*Web Site*:  '+  customer.UserCustom15[0] + "\n";  }
            if ('UserCustom12' in customer) { botResponse = botResponse +   '*Plan*:  '+  customer.UserCustom12[0] + "\n";  }
            if ('UserCustom21' in customer) { botResponse = botResponse +   '*Site Status*:  '+  customer.UserCustom21[0] + "\n";  }
            if ('AccountBalance' in customer) { botResponse = botResponse + '*Account Balance*:  '+  customer.AccountBalance[0] + "\n";  }
            bot.api.reactions.add({
              timestamp: message.ts,
              channel: message.channel,
              name: 'mag',
            },function(err, res) {
              if (err) {
                bot.botkit.log('Failed to add emoji reaction :(',err);
              }
            });
            bot.reply(message, botResponse);
          } else {
            bot.reply(message, 'Nope, sorry, did not work. Either there was an error, or that is not a Neto customer. Try again.');
          }
        }
      }
    });
  });
});


//Neto Account Information

//Uptime

controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function(bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':robot_face: I am a bot named <@' + bot.identity.name +
             '>. I have been running for ' + uptime + ' on ' + hostname + '.');

    });

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}

//Uptime

//Place commands above this line

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
  bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
})



