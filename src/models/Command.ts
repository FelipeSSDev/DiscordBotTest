import {Message} from 'discord.js';

export default class Command {
  public static prefix = '::';
  private _message;
  private _argument;
  private _subarguments;

  constructor(message: Message) {
    this._message = message;
    [this._argument, ...this._subarguments] = message.content.slice(Command.prefix.length).split(' ');
  }

  get message() {
    return this._message;
  }

  get argument() {
    return this._argument;
  }

  get subarguments() {
    return this._subarguments;
  }

  startsWithPrefix() {
    return this._message.content.startsWith(Command.prefix);
  }
}
