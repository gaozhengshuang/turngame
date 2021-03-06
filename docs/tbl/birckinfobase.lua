// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TBirckInfo : table.ITBirckInfoDefine[] = [
		{ Id : 1, Brickid : 1, Info : "4-0-1-1", Bullet : 1, Time : 0, Type : 1 	},
		{ Id : 2, Brickid : 1, Info : "9-2-1-2", Bullet : 1, Time : 0, Type : 1 	},
		{ Id : 3, Brickid : 1, Info : "14-4-1-3", Bullet : 1, Time : 0, Type : 1 	},
		{ Id : 4, Brickid : 1, Info : "19-6-2-4", Bullet : 1, Time : 0, Type : 1 	},
		{ Id : 5, Brickid : 1, Info : "24-10-3-5", Bullet : 1, Time : 0, Type : 1 	},
		{ Id : 6, Brickid : 1, Info : "1-0-0-1", Bullet : 0, Time : 0, Type : 2 	},
		{ Id : 7, Brickid : 1, Info : "11-0-0-1", Bullet : 0, Time : 30, Type : 3 	},
		{ Id : 8, Brickid : 1, Info : "4-0-0-1", Bullet : 0, Time : 0, Type : 4 	},
		{ Id : 9, Brickid : 1, Info : "11-0-0-1", Bullet : 0, Time : 60, Type : 5 	},
		{ Id : 10, Brickid : 1, Info : "11-0-0-1", Bullet : 0, Time : 60, Type : 6 	},
		{ Id : 11, Brickid : 1, Info : "11-0-0-1", Bullet : 0, Time : 60, Type : 7 	},
		{ Id : 12, Brickid : 1, Info : "4-0-0-1", Bullet : 0, Time : 0, Type : 8 	},
		{ Id : 13, Brickid : 1, Info : "11-0-0-1", Bullet : 0, Time : 30, Type : 3 	},
		{ Id : 14, Brickid : 1, Info : "11-0-0-1", Bullet : 0, Time : 45, Type : 5 	},
		{ Id : 15, Brickid : 1, Info : "11-0-0-1", Bullet : 0, Time : 45, Type : 6 	},
		{ Id : 16, Brickid : 1, Info : "11-0-0-1", Bullet : 0, Time : 40, Type : 7 	},
		{ Id : 17, Brickid : 1, Info : "11-0-0-1", Bullet : 0, Time : 30, Type : 3 	},
		{ Id : 18, Brickid : 1, Info : "11-0-0-1", Bullet : 0, Time : 30, Type : 5 	},
		{ Id : 19, Brickid : 1, Info : "11-0-0-1", Bullet : 0, Time : 30, Type : 6 	},
		{ Id : 20, Brickid : 1, Info : "11-0-0-1", Bullet : 0, Time : 25, Type : 7 	}
	]


// Id
export var TBirckInfoById : game.Dictionary<table.ITBirckInfoDefine> = {}
function readTBirckInfoById(){
  for(let rec of TBirckInfo) {
    TBirckInfoById[rec.Id] = rec; 
  }
}
readTBirckInfoById();
}

