import {Entity, model, property} from '@loopback/repository';

@model()
export class Recipe extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'array',
    itemType: 'any',
    required: true,
  })
  ingredients: any[];

  @property({
    type: 'string',
    required: true,
  })
  instructions: string;

  @property({
    type: 'number',
    required: true,
  })
  prepTime: number;

  @property({
    type: 'number',
    required: true,
  })
  cookTime: number;

  @property({
    type: 'number',
    required: true,
  })
  totalTime: number;

  @property({
    type: 'number',
    required: true,
  })
  servings: number;

  @property({
    type: 'array',
    itemType: 'any',
    required: true,
  })
  difficulty: any[];

  @property({
    type: 'string',
    required: true,
  })
  cuisine: string;

  @property({
    type: 'string',
    required: true,
  })
  dietaryPreferences: string;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'string',
    required: true,
  })
  tags: string;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'array',
    itemType: 'any',
    required: true,
  })
  reviews: any[];


  constructor(data?: Partial<Recipe>) {
    super(data);
  }
}

export interface RecipeRelations {
  // describe navigational properties here
}

export type RecipeWithRelations = Recipe & RecipeRelations;
