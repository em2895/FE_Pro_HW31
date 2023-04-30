class Student {
	constructor(firstName, lastName, birthday, marks) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthday = birthday;
		this.marks = marks;
		this.attendance = new Array(25);
		this.attendanceIdx = 0;
		this.age = this.getAge(birthday);
		this.averageMark = this.marks.reduce((sum, mark) => sum + mark) / this.marks.length;
		this.goodAttendance = 0.9;
		this.goodMarks = 90;
		this.results = {
			BAD: "Редиска!",
			NOT_BAD: "Добре, але можна краще!",
			GOOD: "Молодець!!"
		};
	}

	absent() {
		if (this.attendance.length > this.attendanceIdx) {
			this.attendance[this.attendanceIdx] = false;
			this.attendanceIdx++;
		}
	};

	present() {
		if (this.attendance.length > this.attendanceIdx) {
			this.attendance[this.attendanceIdx] = true;
			this.attendanceIdx++;
		}
	};
	

	get averageAttendance() {
		let attendanceCount = this.attendance.slice(0, this.attendanceIdx).filter(x => x).length;
		return attendanceCount / this.attendanceIdx;
	}

	getAge(dateString) {
		let today = new Date();
		let birthDate = new Date(dateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		let month = today.getMonth() - birthDate.getMonth();
		if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	summary() {
		if (this.averageMark < this.goodMarks && this.averageAttendance < this.goodAttendance) {
			console.log(`${this.firstName} ${this.lastName} (${this.age} р.), cередній бал: ${this.averageMark} - ${this.results.BAD}`);
		} else if (this.averageMark < this.goodMarks || this.averageAttendance < this.goodAttendance) {
			console.log(`${this.firstName} ${this.lastName} (${this.age} р.), cередній бал: ${this.averageMark} - ${this.results.NOT_BAD}`);
		} else {
			console.log(`${this.firstName} ${this.lastName} (${this.age} р.), cередній бал: ${this.averageMark} - ${this.results.GOOD}`);
		}
	}
}

let student1 = new Student('Дарія', 'Сливка', '14 Jun 1996', [93, 89, 94, 96]);
let student2 = new Student('Віктор', 'Кулеба', '24 Aug 1993', [85, 92, 90, 87]);
let student3 = new Student('Петро', 'Федоров', '21 Sep 1990', [79, 75, 83, 77]);

for (let i = 0; i < 12; i++) {
    student1.present();
}

for (let i = 0; i < 7; i++) {
    student2.present();
}

for (let i = 0; i < 4; i++) {
    student3.present();
    for (let j = 0; j < 2; j++) {
        student3.absent();
    }
}

student1.summary();
student2.summary();
student3.summary();