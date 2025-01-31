import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Recipe} from '../models';
import {RecipeRepository} from '../repositories';

export class RecipeController {
  constructor(
    @repository(RecipeRepository)
    public recipeRepository : RecipeRepository,
  ) {}

  @post('/recipes')
  @response(200, {
    description: 'Recipe model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recipe)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recipe, {
            title: 'NewRecipe',
            exclude: ['id'],
          }),
        },
      },
    })
    recipe: Omit<Recipe, 'id'>,
  ): Promise<Recipe> {
    return this.recipeRepository.create(recipe);
  }

  @get('/recipes/count')
  @response(200, {
    description: 'Recipe model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recipe) where?: Where<Recipe>,
  ): Promise<Count> {
    return this.recipeRepository.count(where);
  }

  @get('/recipes')
  @response(200, {
    description: 'Array of Recipe model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recipe, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recipe) filter?: Filter<Recipe>,
  ): Promise<Recipe[]> {
    return this.recipeRepository.find(filter);
  }

  @patch('/recipes')
  @response(200, {
    description: 'Recipe PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recipe, {partial: true}),
        },
      },
    })
    recipe: Recipe,
    @param.where(Recipe) where?: Where<Recipe>,
  ): Promise<Count> {
    return this.recipeRepository.updateAll(recipe, where);
  }

  @get('/recipes/{id}')
  @response(200, {
    description: 'Recipe model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recipe, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Recipe, {exclude: 'where'}) filter?: FilterExcludingWhere<Recipe>
  ): Promise<Recipe> {
    return this.recipeRepository.findById(id, filter);
  }

  @patch('/recipes/{id}')
  @response(204, {
    description: 'Recipe PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recipe, {partial: true}),
        },
      },
    })
    recipe: Recipe,
  ): Promise<void> {
    await this.recipeRepository.updateById(id, recipe);
  }

  @put('/recipes/{id}')
  @response(204, {
    description: 'Recipe PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recipe: Recipe,
  ): Promise<void> {
    await this.recipeRepository.replaceById(id, recipe);
  }

  @del('/recipes/{id}')
  @response(204, {
    description: 'Recipe DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recipeRepository.deleteById(id);
  }
}
