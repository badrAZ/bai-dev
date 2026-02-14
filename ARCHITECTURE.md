# Project architecture

This document describes the structure of the project, the design decisions made, and the rationale behind them. It also provides guidelines for contributing to the project and maintaining its codebase.

## Design principles

The architecture of this project is based on the following design principles:

- **Modularity**: The project is organized into modules that encapsulate specific functionality. This promotes separation of concerns and makes it easier to maintain and extend the codebase.
- **Scalability**: The architecture is designed to accommodate future growth and changes in requirements. It allows for the addition of new features and components without significant refactoring.
- **Testability**: The architecture promotes testability by encouraging the use of interfaces and dependency injection. This allows for easier unit testing and integration testing of the components.
- **Maintainability**: The architecture is designed to be easy to understand and maintain. It follows established coding conventions and best practices. This includes clear naming conventions, consistent code formatting, and comprehensive documentation.

## Naming conventions

The project follows the following naming conventions:

- **Classes**: Class names are written in PascalCase (e.g., `MyClass`).
- **Methods**: Method names are written in camelCase (e.g., `myMethod`).
- **Variables**: Variable names are written in camelCase (e.g., `myVariable`).
- **Constants**: Constant names are written in UPPER_SNAKE_CASE (e.g., `MY_CONSTANT`).
- **Files**: File names are written in kebab-case (e.g., `my-file.ts`).

## structure

- `src/`: Contains the source code of the application.
  - `core/`: Contains core components and utilities that are used across the application.
  - `features/`: Contains the different features of the application, organized in a feature-based structure.
    - `<feature>/`: Each feature has its own directory, which contains the following subdirectories:
      - `domain/`: Contains domain models that will be used across the application.
      - `application/`: contains business use cases.
      - `infra/`: Contains the implementation of the business requirements, such as repositories and adapters.
      - `controllers/`: Contains the controllers that coordinate between the application and the user interface.
      - `bind-<feature>.ts`: The entry point for the feature, where dependencies are bound together using inversify.
  - `extension.ts`: The entry point of the extension, where the extension is activated and deactivated.
  - `inversify.ts`: Contains the configuration for the inversify container, where all dependencies are registered.

## Register a code lens

- Create new class that extends the abstract class `VscodeCodeLens` in the `core/` directory.
- Register the new class in `CodeLensRegistry` in the `core/` directory.

## Register a command

- Create a new class that extends the abstract class `VscodeCommand` in the `core/` directory.
- Register the new class in `CommandRegistry` in the `core/` directory.
- Add the command to the `package.json` file under the `contributes.commands` section.
