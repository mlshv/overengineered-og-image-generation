export type User = {
	name: string;
	avatar: string;
};

export async function fetchMockedUserData(userId: string): Promise<User> {
	const user = MOCKED_USERS[userId as keyof typeof MOCKED_USERS];

	if (!user) {
		return Object.values(MOCKED_USERS).at(-1) as User;
	}

	return user;
}

const MOCKED_USERS: Record<string, User> = {
	"1": {
		name: "Johnny Doe",
		avatar:
			"https://github.com/yavuzceliker/sample-images/blob/main/images/image-273.jpg?raw=true",
	},
	"2": {
		name: "Konstantin Konstantinopolsky",
		avatar:
			"https://github.com/yavuzceliker/sample-images/blob/main/images/image-274.jpg?raw=true",
	},
	"3": {
		name: "Mary Jane",
		avatar:
			"https://github.com/yavuzceliker/sample-images/blob/main/images/image-420.jpg?raw=true",
	},
	"4": {
		name: "Misha Malyshev",
		avatar:
			"https://github.com/yavuzceliker/sample-images/blob/main/images/image-175.jpg?raw=true",
	},
	"5": {
		name: "Maggie Johnson",
		avatar:
			"https://github.com/yavuzceliker/sample-images/blob/main/images/image-176.jpg?raw=true",
	},
};
