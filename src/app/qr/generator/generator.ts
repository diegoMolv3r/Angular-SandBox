import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generator',
  imports: [QRCodeComponent, FormsModule],
  templateUrl: './generator.html',
  styleUrl: './generator.css',
})
export class Generator {
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";

  constructor() {
    this.myAngularxQrCode = '...';
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
