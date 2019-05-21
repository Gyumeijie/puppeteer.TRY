const email = require('emailjs');

const sendEmail = (type, settings) => {
  let server = null;
  let tries = 0;
  const MAX_TRY_TIMES = 5;

  const emailTypes = {
    isAlive: {
      settings: {
        text: '检测程序还在正常运行',
        from: settings.emailTypes.isAlive.from,
        to: settings.emailTypes.isAlive.to,
        subject: '程序运行状态报告'
      }
    },
    result: {
      settings: {
        text: '论文外审结果已经出来了',
        subject: '论文外审结果'
      }
    }
  };

  const connect = () => {
    // Try to catch timedout error while connecting to smtp server
    try {
      server = email.server.connect({
        user: settings.server.user,
        password: settings.server.password,
        host: settings.server.host,
        port: settings.server.port,
        ssl: true,
        timeout: 50000
      });
    } catch (e) {
      if (tries < MAX_TRY_TIMES) {
        console.log('connect...', e.message);
        connect();
        tries = tries + 1;
      }
    }
  };

  connect();

  if (type === 'isAlive') {
    server.send(emailTypes.isAlive.settings, (err, message) => {
      console.log(err || message);
    });
  } else {
    server.send(
      {
        ...emailTypes.result.settings,
        ...settings.emailTypes.result.self
      },
      (err, message) => {
        console.log(err || message);
      }
    );
    server.send(
      {
        ...emailTypes.result.settings,
        ...settings.emailTypes.result.others
      },
      (err, message) => {
        console.log(err || message);
      }
    );
  }
};

module.exports = sendEmail;
