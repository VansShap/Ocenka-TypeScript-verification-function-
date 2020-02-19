import {validate} from "./ValidateFunction";

let object = {
    "header": [
        {
            "header_name": "sdbr_CA",
            "header_tag": "Стройаудит"
        },
        {
            "header_name": "sdbr_admin",
            "header_tag": "Администрирование"
        }
    ],
    "sidebar": {
        "sdbr_CA": [
            {
                "text": "Документоборот",
                "content": [
                    {
                        "text": "Просмотр договоров",
                        "action": "contracts/view",
                        "tabName": "Договора"
                    },
                    {
                        "text": "Шаблоны",
                        "action": "documents/docSetTemplateList",
                        "tabName": "Шаблоны"
                    }
                ]
            }
        ],
        "sdbr_admin": [
            {
                "text": "Хранилище файлов",
                "content": [
                    {
                        "text": "Тома данных",
                        "action": "filestorage/volume",
                        "tabName": "Тома"
                    },
                    {
                        "text": "Хранилища данных",
                        "action": "filestorage/storage",
                        "tabName": "Хранилища"
                    },
                    {
                        "text": "Загруженные файлы",
                        "action": "filestorage/view",
                        "tabName": "Файлы"
                    }
                ]
            },
            {
                "text": "Логи",
                "content": [
                    {
                        "text": "Основной лог",
                        "action": "admin/log",
                        "tabName": "Лог"
                    }
                ]
            },
            {
                "text": "Права доступа и пользователи",
                "content": [
                    {
                        "text": "Организации",
                        "action": "admin/organizations",
                        "tabName": "Организации"
                    },
                    {
                        "text": "Роли Организаций",
                        "action": "admin/organization_roles",
                        "tabName": "Роли Организаций"
                    },
                    {
                        "text": "Создать приглашение",
                        "action": "admin/generate_register_token",
                        "tabName": "Приглашения"
                    },
                    {
                        "text": "Список пользователей",
                        "action": "admin/users",
                        "tabName": "Пользователи"
                    },
                    {
                        "text": "Роли Пользователей",
                        "action": "admin/user_roles",
                        "tabName": "Роли Пользователей"
                    },
                    {
                        "text": "Список прав доступа",
                        "action": "admin/permissions",
                        "tabName": "Права"
                    }
                ]
            },
            {
                "text": "Конфигурации",
                "content": [
                    {
                        "text": "Отправить новую конфигурацию",
                        "action": "admin/config",
                        "tabName": "Конфигурации"
                    }
                ]
            },
            {
                "text": "Тестирование компонентов",
                "content": [
                    {
                        "text": "Тест 1",
                        "action": "admin/test1",
                        "tabName": "Тест 1"
                    }
                ]
            }
        ]
    },
    "model": {
        "mdl_modelName": {
            "name": "mdl_modelName",
            "title": "Название на русском",
            "columns": [
                {
                    "name": "uuid",
                    "title": "Идентификатор",
                    "type": "key"
                },
                {
                    "name": "fieldLink",
                    "title": "Тип тома",
                    "type": "link",
                    "model": "mdl_secondModelName"
                }
            ],
            "layouts": {
                "all": [
                    "uuid",
                    "fieldLink"
                ],
                "view": [
                    "fieldLink"
                ],
                "add": [
                    "fieldLink"
                ],
                "edit": [
                    "fieldLink"
                ]
            },
            "commands": [],
            "tasks": []
        },
        "mdl_secondModelName": {
            "name": "mdl_secondModelName",
            "title": "Название на русском",
            "columns": [
                {
                    "name": "uuid",
                    "title": "Идентификатор",
                    "type": "key"
                },
                {
                    "name": "type",
                    "title": "Тип тома",
                    "type": "string"
                }
            ],
            "layouts": {
                "all": [
                    "uuid",
                    "type"
                ],
                "view": [
                    "type"
                ]
            }
        }
    }
};

let isValid: boolean = validate(object);

if (isValid == true) {
    console.log("Config file is valid!");
}
else {
    console.log("Config file isn't valid!");
}
