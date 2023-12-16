import { Injectable } from '@angular/core';

declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  //mesajın Type enum olarak al ona göre mesajı yansıt fonksiyonu.
  //çünkü enumlara ulaaşılır ama alertify fonksiyonlarında direkt ulaşılmaz.
  message(message: string, options: Partial<AlertifyOptions>) {
    //partial nesne newlemeden ulaşabilmek için
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    const msj = alertify[options.messageType](message);

    // if (options.dissmissOthers) {
    //   this.dissmissAll();
    // }
  }

  dissmissAll() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Success;
  position: Position = Position.TopRight;
  delay: number = 1;
  dissmissOthers: boolean = false;
}

export enum MessageType {
  Error = 'error',
  Message = 'message',
  Notify = 'notify',
  Success = 'success',
  Warning = 'warning',
}

export enum Position {
  TopRight = 'top-right',
  TopLeft = 'top-left',
  TopCenter = 'top-center',
  BottomRight = 'bottom-right',
  BottomLeft = 'bottom-left',
  BottomCenter = 'bottom-center',
}
