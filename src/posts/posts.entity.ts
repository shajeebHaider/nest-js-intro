import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatePostMetaOptionsDto } from '../meta-options/dtos/create-post-metaoptions.dto';
import { MetaOptions } from 'src/meta-options/meta-options.entity';

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

  @Column({
    type: 'varchar',
    length: 90,
    nullable: true,
  })
  tags: string[];

  @OneToOne(() => MetaOptions)
  @JoinColumn()
  metaOptions?: MetaOptions;
}
