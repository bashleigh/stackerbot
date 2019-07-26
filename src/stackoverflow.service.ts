import {Injectable, Inject} from '@nestjs/common';

@Injectable()
export class StackoverflowService {
  constructor(@Inject('stackexchange') private readonly stackExchange) {}

  async findAnswers(title: string): Promise<{title: string; link: string}[]> {
    const result = await new Promise<{items: {title: string; link: string}[]}>((reject, resolve) => {
      this.stackExchange.questions.questions({
        key: '',
        tagged: 'nestjs',
        sort: 'relevant',
        order: 'desc',
        title,
      }, (err, results) => {
        if (err) {
          reject(err);
        } else resolve(results);
      });
    });

    return result.items;
  }
}
