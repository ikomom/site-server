import { IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly age: number;
  @IsString()
  readonly breed: string;
  @IsString()
  readonly color: string;
  @IsString()
  readonly master: string;
}
