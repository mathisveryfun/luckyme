//Usersservice 는 유저의 정보를 저장 조회하는 역할을 위주로 함.

import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';

// EmailService 프로바이더를 새로 만듬.
import { EmailService } from '../Email/email.service';

// UserInfo import
import { UserInfo } from '../UserInfo'

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) { }
  async createUser(name: string, email: string, password: string) {
    // 가입하려는 유저가 존재하는지 검사 우선 false
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    // 유저를 데이터베이스에 저장
    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private checkUserExists(email: string) {
    return false; // TODO: DB 연동 후 구현
  }

  private saveUser(name: string, email: string, password: string, signupVerifyToken: string) {
    return; // TODO: DB 연동 후 구현
  }

  // 이메일 uuid 인증 체크
  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT를 발급
  
    throw new Error('Method not implemented.');
  }


  // 로그인 구현
  async login(email: string, password: string): Promise<string> {
    // TODO
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. JWT를 발급
  
    throw new Error('Method not implemented.');
  }
  
  // 유저정보 조회 구현
  async getUserInfo(userId: string): Promise<UserInfo> {
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. 조회된 데이터를 UserInfo 타입으로 응답
  
    throw new Error('Method not implemented.');
  }
  
  // 회원가입 이메일 발송
  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
  }
}