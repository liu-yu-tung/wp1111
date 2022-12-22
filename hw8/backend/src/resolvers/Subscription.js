import { makeName } from '../models/useChatBox'

const Subscription = {
  chatMessages: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.subscribe(`chatbox ${makeName(args.user1, args.user2)}`)
    }
  }
};

export { Subscription as default };
