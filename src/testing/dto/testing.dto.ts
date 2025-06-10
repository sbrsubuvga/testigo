import { IsUrl } from 'class-validator';

export class TestingDto {
  @IsUrl()
  url: string;
}
