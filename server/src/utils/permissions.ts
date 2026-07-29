export	type	Role	=	"OWNER"	|	"MANAGER"	|	"ADMIN"	|	"USER";
export	type	Permission	=
		|	"dish:create"
		|	"dish:update"
		|	"dish:delete"
		|	"dish:view"
		|	"order:view_all"
		|	"order:approve"
		|	"order:create"							
		|	"order:view_own"
		|	"user:promote_admin"
		|	"user:promote_manager"
		|	"user:demote";
        
//	Admin's	permission	set	—	the	"base"	set	for	staff.
const	adminPermissions:	Permission[]	=	[
		"dish:create",
		"dish:update",
		"dish:delete",
		"dish:view",
		"order:view_all",
		"order:approve",
];

//	Manager	=	everything	Admin can do + user management.
//	we SPREAD adminPermissions instead	of	retyping them —	this is	the

const	managerPermissions:	Permission[]	=	[
		...adminPermissions,
		"user:promote_admin",
		"user:demote",
];
//	Owner = everything Manager	can	do	+ the ability to make Managers.
//	(Only the Owner	can	create a Manager —	a Manager cannot	create	another	Manager,

const	ownerPermissions:	Permission[]	=	[
		...managerPermissions,
		"user:promote_manager",
];
const	userPermissions:	Permission[]	=	[
		"dish:view",
		"order:create",
		"order:view_own",
];
export	const rolePermissions:	Record<Role, Permission[]>	=	{
		OWNER:	ownerPermissions,
		MANAGER:	managerPermissions,
		ADMIN:	adminPermissions,
		USER:	userPermissions,
};
export	function hasPermission(role:	Role,	permission:	Permission):boolean	{
		return	rolePermissions[role].includes(permission);
}