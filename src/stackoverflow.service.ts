import { Injectable, Inject } from '@nestjs/common';
import StackExchange from './config/stackexchange';
import 'isomorphic-fetch';

@Injectable()
export class StackoverflowService {
  constructor(
    @Inject('stackexchange') private readonly stackExchange,
    private readonly stackConfig: StackExchange,
  ) {}

  async findAnswers(title: string): Promise<{ title: string; link: string }[]> {
    const searchParams = new URLSearchParams();
    const params = {
      order: 'desc',
      sort: 'relevance',
      title,
      filter: 'default',
      site: 'stackoverflow',
      tagged: ['nestjs'],
    };

    Object.keys(params).forEach(key => searchParams.append(key, params[key]));

    const response = await fetch(
      'https://api.stackexchange.com/2.2/search/advanced?' +
        searchParams.toString(),
    );

    if (![200].includes(response.status)) {
      throw Error(`Stackexchange resulted in [${response.status}]`);
    }

    const result: {
      [s: string]: any;
      items: {
        title: string;
        link: string;
      }[];
    } = await response.json();

    return result.items;
  }
}
