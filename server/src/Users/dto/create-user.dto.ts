// DTO를 클래스로 만든 이유

/* 클래스는 Javascript ES6 표준의 일부이기 때문에
 타입스크립트에서 자바스크립트로 컴파일(혹은 트랜스파일)해도
  그 원형이 남아있는 반면, 
  타입스크립트의 인터페이스는 컴파일하면 그 원형이 사라집니다.
   따라서 Nest는 런타임 중에 이를 참조할 수가 없습니다. 
   런타임에 변수의 메타 타입에 접근할 수 있어야
    Pipe와 같은 기능이 제대로 작동할 수 있기 때문에 이는 매우 중요한 문제입니다. 
    https://www.wisewiredbooks.com/nestjs/overview/03-controller-2.html
    */

export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}