![integration logo](https://raw.githubusercontent.com/Luis-Domenech/prisma-generator-basic-typegraphql/main/img/integration.png)

# prisma-generator-basic-typegraphql

> This generator was bootstraped using [create-prisma-generator](https://github.com/YassinEldeeb/create-prisma-generator)

## Description
An extremely basic typegraphql type generator for prisma. I needed something like typegraphql-prisma that works with prisma `4.0` and at the time of writing this, typegraphql-prisma hasn't updated their generator to `4.0`... so I made this extremely simple generator to generate typegraphql types. 

Essentially, this generator exports one file into a desired directory with all models and enums converted to TypeGraphQL types which you can then use in your TypeGraphQL dependent project.

## Installation
You can install this generator with:
```yarn add --dev prisma-generator-basic-typegraphql```
or
```npm i -D prisma-generator-basic-typegraphql```

## Usage 
To use the generator, add the following to your schema.prisma file:
```typescript
generator basic_typegraphql {
  provider        = "prisma-generator-basic-typegraphql"
  output          = "../generated/type-graphql"
  outputName      = "type-graphql.ts"
  wipeOutput      = true
  useYarn         = true
  hideRelations   = false
  strictModifiers = true
  skipVerCheck    = false
  installDeps     = false
}
```

## Config Options
The generator can be configured with the following options:
| Option            | Value                       | Default                                             | Comment                                                                                       |
| ----------------- |:---------------------------:|:---------------------------------------------------:| ---------------------------------------------------------------------------------------------:|
| output            | ``` string ```              | ``` ../src/generated/type-graphql ```               | Folder where generated file will be stored. This folder is auto created if it doesn't exists. |
| outputName        | ``` string ```              | ``` type-graphql.ts ```                             | Name of the file to generate.                                                                 |
| wipeOutput        | ``` boolean ```             | ``` false ```                                       | If true, output folder will be deleted before new file is generated.                          |
| strictModifiers   | ``` boolean ```             | ``` false ```                                       | If true, all modifiers require to have '///' and be on top of field it modifies.              |
| installDeps       | ``` boolean ```             | ``` false ```                                       | If true, dependencies based on schema will be installed like graphql-scalars.                 |
| useYarn           | ``` boolean ```             | ``` false ```                                       | Sets whether to use yarn or npm for installing packages if installDeps is true.               |
| hideRelations     | ``` boolean ```             | ``` false ```                                       | By default, all fields are emitted. If set to true, this will omit all relation types.        |
| skipVerCheck      | ``` boolean ```             | ``` false ```                                       | If true, generator will run without checking installed prisma version.                        |

## Modifiers
If you want to modify a field, you can write a comment and add the modifiers above the field or after the field. If the strictModifiers is true, then modifiers can only be typed above the field and must have '///' so wwe know it is a modifier and not a comment.

Modifiers: (I put various options for every modifier so you can choose whichever you like)
1. Omit: To not include @Field to a field, meaning that the field is not exposed in graphql
- @omit
- @hide
- @TypeGraphQL.omit(output: true)
2. Emit: If hideRelation is true, then all relation types will be omitted. If you wan't some fields to be ignored by hideRelation, then use the emit modifier on desired fields to emit them.
- @emit
- @hide
- @TypeGraphQL.omit(output: false)
3. Nullable: If a field has been emitted, the nullable option in @Field will be set based on whether the field is required or not. If you want to override this, use this modifier.
- @nullable
- @null
- @TypeGraphQL.omit(nullable: true)

## Important Notes
1. Prisma Unsupported type is not passed to the generator, so we can't deal with that type.
2. The code here was sourced from multiple places inlcuding [create-prisma-generator](https://github.com/YassinEldeeb/create-prisma-generator), [typegraphql-prisma](https://github.com/MichalLytek/typegraphql-prisma) and [prisma-dbml-generator](https://github.com/notiz-dev/prisma-dbml-generator)
3. Image in this readme was sourced from [typegraphql-prisma](https://github.com/MichalLytek/typegraphql-prisma)
