import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post()
  async create(@Body() createCertificateDto: CreateCertificateDto) {
    return await this.certificateService.create(createCertificateDto);
  }

  @Get()
  findAllByUser(@Query('userId') userId: string) {
    return this.certificateService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificateService.findOne(id);
  }
}
