import { PrismaClient } from '@prisma/client';

export type SelectQuery<T> = {
  select?: {
    [K in keyof T]?: boolean;
  };
  include?: {
    [K in keyof T]?:
      | true
      | {
          select?: SelectQuery<T[K]>;
        };
  };
};

export type Template<T> = (selectQuery: SelectQuery<T>, prisma: PrismaClient) => SelectQuery<T>;

export class PrismaQueryTemplates {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public createTemplate<T>(template: Template<T>, selectQuery?: SelectQuery<T>): SelectQuery<T> {
    const baseSelectQuery: SelectQuery<T> = selectQuery || {};

    return template(baseSelectQuery, this.prisma);
  }
}

