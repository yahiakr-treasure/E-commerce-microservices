import {Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, ForeignKey} from 'sequelize-typescript';


@Table
export class Order extends Model<Order> {
  @Column
  public item!: string;

  @Column
  public client!: string;

  @Column
  public state!: boolean;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

}
