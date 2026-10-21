import "@typespec/http";
import "@typespec/openapi3";

using TypeSpec.Http;

// API-контракт «Календаря звонков» (карта #8, тикет #12).
// Контракт как артефакты без живого бэкенда: ADR-0002, docs/spec/app.md.
// Скелет: модели и эндпоинты — тикеты #9 и #10.
@service(#{
  title: "Календарь звонков",
})
namespace CallScheduling;
