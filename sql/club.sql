CREATE TABLE Clubs (
    club_id INT AUTO_INCREMENT PRIMARY KEY,
    club_name VARCHAR(100) NOT NULL,
    club_type VARCHAR(50),
    establishment_date DATE
);

INSERT INTO
    Clubs (club_name, club_type, establishment_date)
VALUES
    ('Múa', 'Văn hóa nghệ thuật', '2020-09-01'),
    ('Bóng đá', 'Thể thao', '2019-05-15'),
    ('Âm nhạc', 'Văn hóa nghệ thuật', '2021-03-10'),
    ('Lập trình', 'Công nghệ thông tin', '2018-12-20'),
    ('Nấu ăn', 'Sở thích', '2020-06-05'),
    ('Du lịch', 'Sở thích', '2019-10-22'),
    ('Ngôn ngữ', 'Học thuật', '2021-01-12');

CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    major VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

INSERT INTO
    Students (student_name, date_of_birth, major, email)
VALUES
    (
        'Nguyễn Văn A',
        '2000-05-10',
        'Khoa học máy tính',
        'vana@example.com'
    ),
    (
        'Trần Thị B',
        '2001-03-18',
        'Quản trị kinh doanh',
        'btran@example.com'
    ),
    (
        'Phạm Văn C',
        '2000-12-05',
        'Điện tử viễn thông',
        'cpham@example.com'
    ),
    (
        'Lê Thị D',
        '2000-08-20',
        'Ngoại ngữ',
        'dle@example.com'
    ),
    (
        'Nguyễn Văn E',
        '2001-01-15',
        'Kiến trúc',
        've@example.com'
    ),
    (
        'Trần Văn F',
        '2000-09-30',
        'Kinh tế học',
        'ftran@example.com'
    ),
    (
        'Hoàng Thị G',
        '2000-06-25',
        'Luật học',
        'ghoang@example.com'
    ),
    (
        'Lý Văn H',
        '2001-04-12',
        'Y học',
        'hly@example.com'
    ),
    (
        'Đinh Thị I',
        '2000-10-08',
        'Sư phạm',
        'idinh@example.com'
    ),
    (
        'Vũ Văn K',
        '2000-11-28',
        'Tâm lý học',
        'kvu@example.com'
    );

CREATE TABLE Members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT,
    student_id INT,
    join_date DATE,
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

INSERT INTO
    Members (club_id, student_id, join_date)
VALUES
    (1, 101, '2023-02-15'),
    (1, 102, '2023-03-20'),
    (2, 103, '2023-01-10'),
    (3, 104, '2023-04-05'),
    (3, 105, '2023-02-28'),
    (4, 106, '2023-03-12'),
    (5, 107, '2023-01-25'),
    (6, 108, '2023-04-18'),
    (6, 109, '2023-03-02'),
    (7, 110, '2023-02-10');

CREATE TABLE Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    event_id INT,
    attendance_date DATE,
    FOREIGN KEY (member_id) REFERENCES Members(member_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);

CREATE TABLE Events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    event_type VARCHAR(50),
    event_date DATE,
    organizer VARCHAR(100),
    description TEXT
);

INSERT INTO
    Events (
        event_name,
        event_type,
        event_date,
        organizer,
        description
    )
VALUES
    (
        'Giải bóng đá sinh viên',
        'Thể thao',
        '2023-04-15',
        'Bộ môn thể thao',
        'Giải đấu bóng đá cho sinh viên toàn trường.'
    ),
    (
        'Đêm nhạc hội',
        'Văn hóa nghệ thuật',
        '2023-03-10',
        'Câu lạc bộ âm nhạc',
        'Buổi biểu diễn nhạc hội đặc sắc của các thành viên câu lạc bộ âm nhạc.'
    ),
    (
        'Hội thảo về lập trình web',
        'Công nghệ thông tin',
        '2023-02-28',
        'Câu lạc bộ lập trình',
        'Hội thảo chia sẻ kiến thức về lập trình web mới nhất.'
    ),
    (
        'Cuộc thi nấu ăn tài năng',
        'Sở thích',
        '2023-03-20',
        'Câu lạc bộ nấu ăn',
        'Thử thách nấu ăn dành cho các tài năng đam mê nấu ăn trong trường.'
    ),
    (
        'Chuyến đi tham quan Hà Nội',
        'Sở thích',
        '2023-02-18',
        'Câu lạc bộ du lịch',
        'Chuyến tham quan các địa danh nổi tiếng của thủ đô Hà Nội.'
    );

INSERT INTO
    Attendance (member_id, event_id, attendance_date)
VALUES
    (1, 1, '2023-03-10'),
    (2, 1, '2023-03-10'),
    (3, 2, '2023-02-28'),
    (4, 3, '2023-04-15'),
    (5, 3, '2023-04-15'),
    (6, 4, '2023-03-20'),
    (7, 5, '2023-02-18'),
    (8, 5, '2023-02-18'),
    (9, 6, '2023-04-25'),
    (10, 7, '2023-03-05');

CREATE TABLE ClubEvents (
    club_id INT,
    event_id INT,
    PRIMARY KEY (club_id, event_id),
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);

INSERT INTO
    ClubEvents (club_id, event_id)
VALUES
    (2, 1),
    (3, 2),
    (4, 3),
    (5, 4),
    (6, 5),
    (7, 5),
    (6, 3),
    (1, 2),
    (2, 4),
    (3, 1);