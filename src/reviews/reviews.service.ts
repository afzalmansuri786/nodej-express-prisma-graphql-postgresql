import { Prisma, PrismaClient } from "@prisma/client";

import {
  CreateMovieReviewInput,
  DeleteMovieReviewInput,
  ListAllMovieReviewsInput,
  UpdateMoviewReviewInput,
} from "./interfaces/review.interface";

export class ReviewsService {
  constructor(private readonly prisma: PrismaClient) {}
  async creatMovierReview(
    createMovieReview: CreateMovieReviewInput,
    userId: number
  ) {
    try {
      createMovieReview.userId = userId;
      const movieReview = await this.prisma.review.create({
        data: createMovieReview,
      });
      return movieReview;
    } catch (error) {
      throw new Error(error);
    }
  }

  async listAllMovieReviews(
    listAllMovieReviews: ListAllMovieReviewsInput,
    userId: number
  ) {
    try {
      const {
        movieId,
        rating,
        sortBy,
        sortOrder,
        searchByComment,
        pagination,
      } = listAllMovieReviews;

      const where: Prisma.reviewWhereInput = {};

      // Apply filters
      if (movieId) {
        where.movieId = movieId;
      }
      if (rating) {
        where.rating = rating;
      }

      if (searchByComment) {
        where.OR = [
          { comment: { contains: searchByComment, mode: "insensitive" } },
        ];
      }

      // Apply sorting
      const orderBy: any = {};
      if (sortOrder) {
        orderBy[sortBy] = sortOrder || {
          id: "asc",
        };
      }

      // Apply pagination
      const { page, pageSize } = pagination || {};
      const skip = page && pageSize ? (page - 1) * pageSize : undefined;
      const take = pageSize;

      const reviews = await this.prisma.review.findMany({
        where,
        orderBy,
        skip,
        take,
      });

      // Move logged-in user review to the top
      if (userId) {
        const userReviewIndex = reviews.findIndex(
          (review) => review.userId === userId
        );
        if (userReviewIndex !== -1) {
          const userReview = reviews.splice(userReviewIndex, 1)[0];
          reviews.unshift(userReview);
        }
      }

      return reviews;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMoviewReview(
    updateMoviewReview: UpdateMoviewReviewInput,
    userId: number
  ) {
    try {
      const existingReview = await this.prisma.review.findUnique({
        where: {
          id: updateMoviewReview.id,
        },
      });
      if (!existingReview) {
        return new Error("Review not found !");
      }

      if (existingReview.userId !== userId) {
        return new Error("You can't update this review");
      }

      await this.prisma.review.update({
        where: {
          id: updateMoviewReview.id,
        },
        data: {
          rating: updateMoviewReview.rating,
        },
      });

      return { message: "Review updated !" };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMovieReview(deleteMovieReview: DeleteMovieReviewInput) {
    try {
      const { id, currentUserId } = deleteMovieReview;

      const review = await this.prisma.review.findUnique({
        where: { id },
      });

      if (!review) {
        return new Error("Review not found !");
      }

      if (review.userId !== currentUserId) {
        return new Error("You can't delete this review !");
      }

      await this.prisma.review.delete({
        where: { id },
      });

      return { message: "Review deleted !" };
    } catch (error) {
      throw new Error(error);
    }
  }
}
