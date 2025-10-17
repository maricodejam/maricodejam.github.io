import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };


export type Tree<T> = {
	parent: Tree<T> | undefined;
	children: Array<Tree<T>> | undefined;
	val: T;
};

export function makeTree<T>() {
	let currentNode: null | Tree<T> = null;
	return {
		/** get the parent of the current node */
		getParent() {
			if (!currentNode) return null;
			return currentNode.parent;
		},
		/**Make current node parent the current node*/
		makeParent() {
			if (!currentNode) return;
			currentNode = currentNode.parent ?? null;
		},
		/**add a child to the current node and make it the current node*/
		makeChild(val: T) {
			const newNode: Tree<T> = {
				val: val,
				parent: undefined,
				children: undefined,
			};
			if (!currentNode) {
				currentNode = newNode;
				return;
			}
			newNode.parent = currentNode;
			if (!currentNode.children) {
				currentNode.children = [];
			}
			currentNode.children.push(newNode);
			currentNode = newNode;
		},
		/**get the current node*/
		getCurrentNode() {
			return currentNode
		},
		/**return the top node of the tree*/
		getRootNode() {
			if (!currentNode) return null;
			while (currentNode.parent) {
				currentNode = currentNode.parent;
			}
			return currentNode;
		},
	};
}
