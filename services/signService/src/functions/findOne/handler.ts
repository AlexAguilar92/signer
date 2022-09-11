import middy from "@middy/core";

const main = middy(async event => {
  const adapter: Adapter = container.get
  const response = await adapter.execute({...event.body, user: event.user})
});