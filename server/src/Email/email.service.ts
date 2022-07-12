import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Inject, Injectable } from '@nestjs/common';
import emailConfig from '../config/emailconfig';
import { ConfigType } from '@nestjs/config';

// 메일 욥선 타입. 수신자(to), 메일 제목, html 형식의 메일 본문을 가짐
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  // nodemailer에서 제공하는 Transporter 객체를 생성
  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>, // 주입받을 때는 @Inject() 데코레이터의 토큰을 앞서 만든 ConfigFactory의 KEY인 'email' 문자열로 넣어주면 됩니다.
  ) {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  async sendMemberJoinVerification(emailAddress: string, signupVerifyToken: string) {
    // 이 링크를 통해 우리 서비스로 이메일 인증 요청이 들어옴
    const baseUrl = this.config.baseUrl; // TODO: config

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    // 메일 본문 구성 form 태그를 이용해 POST 요청 실시
    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `
    }
    
    // transporter 객체를 이용해 메일 전송
    return await this.transporter.sendMail(mailOptions);
  }
}