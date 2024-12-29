import { Types } from 'mongoose';

export class UserResponseDto {
    id: string; // MongoDB ObjectId (converted to string for responses)

    name: string;

    username: string;

    email: string;

    profilePicture?: string;

    bio?: string;

    preferences: string[]; // User's genre preferences

    watchedMovies: Types.ObjectId[]; // List of movie IDs marked as watched

    likedMovies: Types.ObjectId[]; // List of movie IDs liked by the user

    watchList: Types.ObjectId[]; // List of movie IDs in the user's watchlist

    following: Types.ObjectId[]; // List of user IDs this user is following

    followers: Types.ObjectId[]; // List of user IDs following this user

    reviews: Types.ObjectId[]; // List of review IDs written by the user

    totalReviews: number;

    totalLikesReceived: number;

    isAdmin: boolean;

    createdAt: Date; // Timestamp when the user was created
    updatedAt: Date; // Timestamp of the last update
}
