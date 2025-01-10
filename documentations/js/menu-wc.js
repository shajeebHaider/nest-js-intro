'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-js-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-3475c7294639b7d4ed615be65d572e808c59c1426cdb6f51b984461e68cb3b24d5c9df0be0170da72b26f1814bd2f54ffb8b5b4a2edc07ea58056dcb939939fa"' : 'data-bs-target="#xs-controllers-links-module-AppModule-3475c7294639b7d4ed615be65d572e808c59c1426cdb6f51b984461e68cb3b24d5c9df0be0170da72b26f1814bd2f54ffb8b5b4a2edc07ea58056dcb939939fa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-3475c7294639b7d4ed615be65d572e808c59c1426cdb6f51b984461e68cb3b24d5c9df0be0170da72b26f1814bd2f54ffb8b5b4a2edc07ea58056dcb939939fa"' :
                                            'id="xs-controllers-links-module-AppModule-3475c7294639b7d4ed615be65d572e808c59c1426cdb6f51b984461e68cb3b24d5c9df0be0170da72b26f1814bd2f54ffb8b5b4a2edc07ea58056dcb939939fa"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-3475c7294639b7d4ed615be65d572e808c59c1426cdb6f51b984461e68cb3b24d5c9df0be0170da72b26f1814bd2f54ffb8b5b4a2edc07ea58056dcb939939fa"' : 'data-bs-target="#xs-injectables-links-module-AppModule-3475c7294639b7d4ed615be65d572e808c59c1426cdb6f51b984461e68cb3b24d5c9df0be0170da72b26f1814bd2f54ffb8b5b4a2edc07ea58056dcb939939fa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-3475c7294639b7d4ed615be65d572e808c59c1426cdb6f51b984461e68cb3b24d5c9df0be0170da72b26f1814bd2f54ffb8b5b4a2edc07ea58056dcb939939fa"' :
                                        'id="xs-injectables-links-module-AppModule-3475c7294639b7d4ed615be65d572e808c59c1426cdb6f51b984461e68cb3b24d5c9df0be0170da72b26f1814bd2f54ffb8b5b4a2edc07ea58056dcb939939fa"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-d830664291b3dd06e833963e2600793fbae9f7416534a8caed954cf165ba90f4e41799d3046e4289219fca8ee444657d7e1a24cda5e09dc8e70e3efac9953adc"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-d830664291b3dd06e833963e2600793fbae9f7416534a8caed954cf165ba90f4e41799d3046e4289219fca8ee444657d7e1a24cda5e09dc8e70e3efac9953adc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-d830664291b3dd06e833963e2600793fbae9f7416534a8caed954cf165ba90f4e41799d3046e4289219fca8ee444657d7e1a24cda5e09dc8e70e3efac9953adc"' :
                                            'id="xs-controllers-links-module-AuthModule-d830664291b3dd06e833963e2600793fbae9f7416534a8caed954cf165ba90f4e41799d3046e4289219fca8ee444657d7e1a24cda5e09dc8e70e3efac9953adc"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-d830664291b3dd06e833963e2600793fbae9f7416534a8caed954cf165ba90f4e41799d3046e4289219fca8ee444657d7e1a24cda5e09dc8e70e3efac9953adc"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-d830664291b3dd06e833963e2600793fbae9f7416534a8caed954cf165ba90f4e41799d3046e4289219fca8ee444657d7e1a24cda5e09dc8e70e3efac9953adc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d830664291b3dd06e833963e2600793fbae9f7416534a8caed954cf165ba90f4e41799d3046e4289219fca8ee444657d7e1a24cda5e09dc8e70e3efac9953adc"' :
                                        'id="xs-injectables-links-module-AuthModule-d830664291b3dd06e833963e2600793fbae9f7416534a8caed954cf165ba90f4e41799d3046e4289219fca8ee444657d7e1a24cda5e09dc8e70e3efac9953adc"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-bf57a58a64c2be9bc04ddc1dd1704ba32cb7be32fcac401319c2f97abff36208164d1462cc2b26c80c88447e1607ad296b8a2ab2d7038d368ce4d66b08c3f2a4"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-bf57a58a64c2be9bc04ddc1dd1704ba32cb7be32fcac401319c2f97abff36208164d1462cc2b26c80c88447e1607ad296b8a2ab2d7038d368ce4d66b08c3f2a4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-bf57a58a64c2be9bc04ddc1dd1704ba32cb7be32fcac401319c2f97abff36208164d1462cc2b26c80c88447e1607ad296b8a2ab2d7038d368ce4d66b08c3f2a4"' :
                                            'id="xs-controllers-links-module-PostsModule-bf57a58a64c2be9bc04ddc1dd1704ba32cb7be32fcac401319c2f97abff36208164d1462cc2b26c80c88447e1607ad296b8a2ab2d7038d368ce4d66b08c3f2a4"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-bf57a58a64c2be9bc04ddc1dd1704ba32cb7be32fcac401319c2f97abff36208164d1462cc2b26c80c88447e1607ad296b8a2ab2d7038d368ce4d66b08c3f2a4"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-bf57a58a64c2be9bc04ddc1dd1704ba32cb7be32fcac401319c2f97abff36208164d1462cc2b26c80c88447e1607ad296b8a2ab2d7038d368ce4d66b08c3f2a4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-bf57a58a64c2be9bc04ddc1dd1704ba32cb7be32fcac401319c2f97abff36208164d1462cc2b26c80c88447e1607ad296b8a2ab2d7038d368ce4d66b08c3f2a4"' :
                                        'id="xs-injectables-links-module-PostsModule-bf57a58a64c2be9bc04ddc1dd1704ba32cb7be32fcac401319c2f97abff36208164d1462cc2b26c80c88447e1607ad296b8a2ab2d7038d368ce4d66b08c3f2a4"' }>
                                        <li class="link">
                                            <a href="injectables/PostServices.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostServices</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-ef5106f7baa193800606ac7b5fa0b17e663e743a6792ce0fa3244e6ff7a0f953960ba88213ec7bccdb0861e6441650641a5a22763a6eb5b596ff45a16a5c4e37"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-ef5106f7baa193800606ac7b5fa0b17e663e743a6792ce0fa3244e6ff7a0f953960ba88213ec7bccdb0861e6441650641a5a22763a6eb5b596ff45a16a5c4e37"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-ef5106f7baa193800606ac7b5fa0b17e663e743a6792ce0fa3244e6ff7a0f953960ba88213ec7bccdb0861e6441650641a5a22763a6eb5b596ff45a16a5c4e37"' :
                                            'id="xs-controllers-links-module-TagsModule-ef5106f7baa193800606ac7b5fa0b17e663e743a6792ce0fa3244e6ff7a0f953960ba88213ec7bccdb0861e6441650641a5a22763a6eb5b596ff45a16a5c4e37"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TagsModule-ef5106f7baa193800606ac7b5fa0b17e663e743a6792ce0fa3244e6ff7a0f953960ba88213ec7bccdb0861e6441650641a5a22763a6eb5b596ff45a16a5c4e37"' : 'data-bs-target="#xs-injectables-links-module-TagsModule-ef5106f7baa193800606ac7b5fa0b17e663e743a6792ce0fa3244e6ff7a0f953960ba88213ec7bccdb0861e6441650641a5a22763a6eb5b596ff45a16a5c4e37"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-ef5106f7baa193800606ac7b5fa0b17e663e743a6792ce0fa3244e6ff7a0f953960ba88213ec7bccdb0861e6441650641a5a22763a6eb5b596ff45a16a5c4e37"' :
                                        'id="xs-injectables-links-module-TagsModule-ef5106f7baa193800606ac7b5fa0b17e663e743a6792ce0fa3244e6ff7a0f953960ba88213ec7bccdb0861e6441650641a5a22763a6eb5b596ff45a16a5c4e37"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-a4225b8e02a83e7e79697fa186c998a6e9b74304b5fb20089134dc091d465a3c5f193f2a2eb32a46d8265fa09cd1ebe4b99eb8f9ce16bc5b45272865dffc9f24"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-a4225b8e02a83e7e79697fa186c998a6e9b74304b5fb20089134dc091d465a3c5f193f2a2eb32a46d8265fa09cd1ebe4b99eb8f9ce16bc5b45272865dffc9f24"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-a4225b8e02a83e7e79697fa186c998a6e9b74304b5fb20089134dc091d465a3c5f193f2a2eb32a46d8265fa09cd1ebe4b99eb8f9ce16bc5b45272865dffc9f24"' :
                                            'id="xs-controllers-links-module-UsersModule-a4225b8e02a83e7e79697fa186c998a6e9b74304b5fb20089134dc091d465a3c5f193f2a2eb32a46d8265fa09cd1ebe4b99eb8f9ce16bc5b45272865dffc9f24"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-a4225b8e02a83e7e79697fa186c998a6e9b74304b5fb20089134dc091d465a3c5f193f2a2eb32a46d8265fa09cd1ebe4b99eb8f9ce16bc5b45272865dffc9f24"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-a4225b8e02a83e7e79697fa186c998a6e9b74304b5fb20089134dc091d465a3c5f193f2a2eb32a46d8265fa09cd1ebe4b99eb8f9ce16bc5b45272865dffc9f24"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-a4225b8e02a83e7e79697fa186c998a6e9b74304b5fb20089134dc091d465a3c5f193f2a2eb32a46d8265fa09cd1ebe4b99eb8f9ce16bc5b45272865dffc9f24"' :
                                        'id="xs-injectables-links-module-UsersModule-a4225b8e02a83e7e79697fa186c998a6e9b74304b5fb20089134dc091d465a3c5f193f2a2eb32a46d8265fa09cd1ebe4b99eb8f9ce16bc5b45272865dffc9f24"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TagsController.html" data-type="entity-link" >TagsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateMetaOptionsDto.html" data-type="entity-link" >CreateMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostServices.html" data-type="entity-link" >PostServices</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TagsService.html" data-type="entity-link" >TagsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});