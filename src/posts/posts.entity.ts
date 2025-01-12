import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatePostMetaOptionsDto } from '../meta-options/dtos/create-post-metaoptions.dto';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { User } from 'src/users/users.entity';
import { Tag } from 'src/tags/tags.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 90,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 90,
    nullable: false,
  })
  postType: string;

  @Column({
    type: 'varchar',
    length: 90,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 90,
    nullable: false,
  })
  status: string;

  @Column({
    type: 'varchar',
    length: 90,
    nullable: true,
  })
  content: string;

  @Column({
    type: 'varchar',
    length: 90,
    nullable: true,
  })
  schema: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  featuredImageUrl: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  publishOn: Date;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];

  @OneToOne(() => MetaOptions, (metaOptions) => metaOptions.post, {
    cascade: true,
    eager: true,
  })
  metaOptions?: MetaOptions;

  @ManyToOne(() => User, (user) => user.post)
  author: User;
}
