//Usersservice 는 유저의 정보를 저장 조회하는 역할을 위주로 함.

import * as uuid from 'uuid';
import {
  Injectable,
  UnprocessableEntityException,
  InternalServerErrorException,
} from '@nestjs/common';

// EmailService 프로바이더를 새로 만듬.
import { EmailService } from '../Email/email.service';

// UserInfo import
import { UserInfo } from '../UserInfo';

// Userentity import
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

// typeORM transaction import
import { Connection } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    // typeORM Repo
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    // typeORM transaction
    private connection: Connection,
  ) {}
  async createUser(name: string, email: string, password: string) {
    // 가입하려는 유저가 존재하는지 검사 우선 false
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      // HTTP Status 422 에러 내장 패키지
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }

    const signupVerifyToken = uuid.v4();

    // 유저를 데이터베이스에 저장
    await this.saveUserUsingQueryRunner(
      name,
      email,
      password,
      signupVerifyToken,
    );
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private async checkUserExists(emailAddress: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ email: emailAddress });

    return user !== undefined;
  }

  private async saveUserUsingQueryRunner(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    // 컨스트럭트로 주입받은 connection객체에서 Queryrunner 실행
    const queryRunner = this.connection.createQueryRunner();

    // DB에 연결 후
    await queryRunner.connect();

    // 트랜잭션 시작
    await queryRunner.startTransaction();
    try {
      // 여기서 user 를 DB에 저장함
      const user = new UserEntity();
      user.id = uuid.v4();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;

      await queryRunner.manager.save(user);

      throw new InternalServerErrorException(); // 일부러 에러를 발생시켜 본다

      // 트랜잭션 허락하여 데이터영속화
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      // 직접 생성한 QueryRunner는 해제시켜 주어야 함
      await queryRunner.release();
    }
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
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
