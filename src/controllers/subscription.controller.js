import { Subsciption } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    const subscriberId = req.user._id;
    
    const subscription = await Subsciption.findOne({ 
         subscriber: subscriberId,
         channel: channelId 
    })

    if (subscription) {
        await Subsciption.deleteOne({ _id: subscription._id });

        return res.status(201).json(
            new ApiResponse(200,{}, "Subscription remove successfully")
        )
    } else {
        const addSubcription = await Subsciption.create({
            subscriber: subscriberId,
            channelId: channelId
        })
    }

    const channel = await User.findById({ _id: channelId})

    const subscribersCount = await Subsciption.countDocuments({ channel: channelId })

    channel.subscribersCount = subscribersCount
    await channel.save();

    return res.status(201).json(
        new ApiResponse(200, channel, "Subscription toggled successfully")
    )
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}