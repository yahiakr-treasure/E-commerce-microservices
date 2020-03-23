import {Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, ForeignKey} from 'sequelize-typescript';


@Table
export class FeedItem extends Model<FeedItem> {
  @Column
  public name!: string;

  @Column
  public url!: string;

  @Column
  public quantity!: number;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();
}
