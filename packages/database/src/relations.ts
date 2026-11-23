import { defineRelations } from "drizzle-orm";

import * as schemas from "./schema";

export const relations = defineRelations(schemas, (r) => ({
  // auth
  user: {
    sessions: r.many.session({
      from: r.user.id,
      to: r.session.id,
    }),
    accounts: r.many.account({
      from: r.user.id,
      to: r.account.id,
    }),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
}));

// export const userRelations = defineRelations(user, ({ many }) => ({
//   sessions: many(session),
//   accounts: many(account),
// }));

// export const sessionRelations = defineRelations(session, ({ one }) => ({
//   user: one(user, {
//     fields: [session.userId],
//     references: [user.id],
//   }),
// }));

// export const accountRelations = defineRelations(account, ({ one }) => ({
//   user: one(user, {
//     fields: [account.userId],
//     references: [user.id],
//   }),
// }));