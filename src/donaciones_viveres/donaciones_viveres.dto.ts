import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max } from 'class-validator';

export class CreateDonaciones_ViveresDto {
  
  @IsString()
  tipo: string;

  @IsString()
  lugar: string;

  @IsInt()
  cantidad: number;

  @IsDateString()
  fecha: Date;

  @IsOptional()
  @IsNumber()
  protectoraId?: number;

}
export class UpdateDonaciones_Viveres {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  tipo?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  lugar?: string;

  @IsOptional()
  @IsInt()
  cantidad?: number;

  @IsOptional()
  @IsDateString()
  fecha?: Date;


  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(1)
  protectoraId?: number;

  
}