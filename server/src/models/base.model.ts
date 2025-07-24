import { Router } from 'express';

export interface RouteInterface {
	path: string;
	route: Router;
}

export interface PaginationInterface {
	page: number;
	size: number;
	sort?: any;
	searchTerm?: any;
	advanceSearch?: any;
}

export interface BasePrismaServiceInterface {
	model: string;
	pagination?: PaginationInterface;
	condition?: any;
	selectedFields?: any;
	size?: number;
	orderBy?: any[];
}

export interface BaseDataInterface {
	createdBy: string | null;
	createdAt: Date;
	updatedBy: string | null;
	updatedAt: Date;
}

export interface BaseResponseInterface {
	value?: Object | null;
	title?: string | null;
	message?: string | null;
}

export interface BaseResponsePaginationInterface extends BaseResponseInterface {
	total?: number | null;
	pages?: number | null;
	page?: number | null;
	size?: number | null;
	sort?: any | null;
}

export interface BaseResponseErrorBodyInterface {
	value?: any;
	title?: string | null;
	message?: string | null;
}

export interface BasePhoneInterface {
	phoneAreaNumber: string;
	phoneNumber: string;
	phoneExt?: string | null;
}

export const baseSelectedValue = {
	timeStamps: () => {
		return {
			createdBy: true,
			createdAt: true,
			updatedBy: true,
			updatedAt: true
		};
	}
};
