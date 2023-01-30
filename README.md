![integration logo](https://raw.githubusercontent.com/Luis-Domenech/prisma-generator-basic-typegraphql/main/img/integration.png)

# prisma-generator-basic-typegraphql

> This generator was bootstraped using [create-prisma-generator](https://github.com/YassinEldeeb/create-prisma-generator)

## Description
An extremely basic typegraphql type generator for prisma. I needed something like typegraphql-prisma that works with prisma `4.0` and at that time, typegraphql-prisma had not updated their generator to support versioon `4.0`, so I made this extremely simple generator to generate typegraphql types.

Essentially, this generator exports one file into a desired directory with all models and enums converted to TypeGraphQL types which you can then use in your TypeGraphQL dependent project. This doesn't emit any CRUD operations like other generators. It just emits models and enums.

## Installation
You can install this generator with:

```yarn add --dev prisma-generator-basic-typegraphql```

or

```npm i -D prisma-generator-basic-typegraphql```

or

```pnpm add -D prisma-generator-basic-typegraphql```

## Usage 
To use the generator, add the following to your schema.prisma file:
```typescript
generator basic_typegraphql {
  provider        = "prisma-generator-basic-typegraphql"
  output          = "../generated/type-graphql-types"
  outputName      = "types.ts"
}
```

## Config Options
The generator can be configured with the following options:
| Option | Value | Default | Comment |
| ----------------- |:---------------------------:|:---------------------------------------------------:|:-------------------------------------------------------------------------------------------------- |
| output | ``` string ``` | ``` ../src/generated/type-graphql-types ``` | Folder where generated file will be stored. This folder is auto created if it doesn't exists. |
| outputName | ``` string ``` | ``` index.ts ``` | Name of the file to generate. |
| wipeOutput | ``` boolean ``` | ``` false ``` | If true, output folder will be deleted before new file is generated. |
| strictModifiers | ``` boolean ``` | ``` false ``` | If true, all modifiers require to have '///' and be on top of field it modifies. |
| installDeps | ``` boolean ``` | ``` false ``` | If true, dependencies based on schema will be installed like graphql-scalars. |
| useYarn | ``` boolean ``` | ``` false ``` | Sets whether to use yarn or npm for installing packages if installDeps is true. |
| hideRelations | ``` boolean ``` | ``` false ``` | By default, all fields without a modifier are emitted. If set to true, this will omit all relation types. |
| skipVerCheck | ``` boolean ``` | ``` false ``` | If true, generator will run without checking installed prisma version. |
| enumAsType | ``` boolean ``` | ``` false ``` | If true, generator will make all enums types. Generated enum as types will be named the same as their enum name and actual enums will also be emitted with `_Enum` attached at the end. |
| enumAsConst | ``` boolean ``` | ``` false ``` | If true, generator will make all enums consts. Generated enum as consts will be named the same as their enum name. Actual enums won't be emitted, but types will also be emitted with their same enum names. |
| optionalRelations | ``` boolean ``` | ``` true ``` | If true, generator will make all relation fields optional. |
| addNull | ``` boolean ``` | ``` false ``` | If true, generator will add `| null` to TS type of optional fields. |
| addUndefined | ``` boolean ``` | ``` false ``` | If true, generator will add `| undefined` to TS type of optional fields. |
| addTypenameField | ``` boolean ``` | ``` false ``` | If true, generator will add a `__typename` field to all TS types. |
| partialRelations | ``` boolean ``` | ``` false ``` | If true, generator will export duplicates of all exported models with the prefix `Partial`. These models have all fields as optional and also nullable if `addNull` is `true`. Also, all relation fields in exported regular and partial models will be set to use these partial counterparts of their type. |



## Modifiers
If you want to modify a field, you can write a comment and add the modifiers above the field or after the field in the same line as the field. If the `strictModifiers` config option is set to true, then modifiers can only be typed above the field and must have `///`, so wwe know it is a modifier and not a comment. Also, for every modifier type, I added various options so you can choose the one you like.

Modifiers:
1. Omit: To not include @Field to a field, meaning that the field is not exposed in graphql
```@omit```
```@hide```
```@TypeGraphQL.omit(output: true)```
2. Emit: If hideRelation is true, then all relation types will be omitted. If you wan't some fields to be ignored by hideRelation, then use the emit modifier on desired fields to emit them.
```@emit```
```@hide```
```@TypeGraphQL.omit(output: false)```
3. Nullable: If a field has been emitted, the nullable option in `@Field` will be set based on whether the field is required or not. If you want to override this, use this modifier.
```@nullable```
```@null```
```@TypeGraphQL.omit(nullable: true)```

## Notes
1. Prisma's Unsupported type is not passed to the prisma generator, as in, in doess not get parsed at all, so I don't deal with that type in this generator.
2. Since the relevant docs for creating a prisma generator are not easy to understand, I took inspiration from multiple generators, inlcuding [create-prisma-generator](https://github.com/YassinEldeeb/create-prisma-generator), [typegraphql-prisma](https://github.com/MichalLytek/typegraphql-prisma) and [prisma-dbml-generator](https://github.com/notiz-dev/prisma-dbml-generator)
3. The image in this readme was sourced from [typegraphql-prisma](https://github.com/MichalLytek/typegraphql-prisma)
