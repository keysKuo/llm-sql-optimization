CREATE TABLE
    phim (
        ma_phim INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        ten_phim VARCHAR(255) NOT NULL,
        the_loai VARCHAR(255),
        thoi_luong INT,
        dao_dien VARCHAR(255),
        dien_vien VARCHAR(255),
        mo_ta TEXT,
        poster VARCHAR(255),
        ngay_khoi_chieu DATE
    );

CREATE TABLE
    phong_chieu (
        ma_phong INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        ten_phong VARCHAR(50) NOT NULL,
        so_ghe INT
    );

CREATE TABLE
    lich_chieu (
        ma_lich_chieu INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        ma_phim INT,
        ma_phong INT,
        ngay_chieu DATE,
        gio_chieu VARCHAR(20),
        gia_ve DECIMAL(10, 2),
        FOREIGN KEY (ma_phim) REFERENCES phim (ma_phim),
        FOREIGN KEY (ma_phong) REFERENCES phong_chieu (ma_phong)
    );

CREATE TABLE
    ve (
        ma_ve INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        ma_lich_chieu INT,
        so_ghe VARCHAR(10),
        gia_ve DECIMAL(10, 2),
        FOREIGN KEY (ma_lich_chieu) REFERENCES lich_chieu (ma_lich_chieu)
    );

CREATE TABLE
    khach_hang (
        ma_khach_hang INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        ten_khach_hang VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        so_dien_thoai VARCHAR(20)
    );

CREATE TABLE
    doanh_thu_ngay (
        id INT PRIMARY KEY AUTO_INCREMENT,
        ngay DATE NOT NULL,
        ma_lich_chieu INT,
        tong_doanh_thu DECIMAL(12, 2),
        so_ve_ban_duoc INT,
        FOREIGN KEY (ma_lich_chieu) REFERENCES lich_chieu (ma_lich_chieu)
    );

CREATE TABLE
    hoa_don (
        ma_hoa_don INT PRIMARY KEY AUTO_INCREMENT,
        ma_khach_hang INT,
        ngay_lap DATE,
        tong_tien DECIMAL(12, 2),
        FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang (ma_khach_hang)
    );

CREATE TABLE
    chi_tiet_hoa_don (
        ma_chi_tiet INT PRIMARY KEY AUTO_INCREMENT,
        ma_hoa_don INT,
        ma_ve INT,
        FOREIGN KEY (ma_hoa_don) REFERENCES hoa_don (ma_hoa_don),
        FOREIGN KEY (ma_ve) REFERENCES ve (ma_ve)
    );

INSERT INTO
    phim (
        ten_phim,
        the_loai,
        thoi_luong,
        dao_dien,
        dien_vien,
        mo_ta,
        poster,
        ngay_khoi_chieu
    )
VALUES
    (
        'Spider-Man: No Way Home',
        'Hành động, Phiêu lưu',
        148,
        'Jon Watts',
        'Tom Holland, Zendaya',
        'Peter Parker tìm kiếm sự giúp đỡ từ Doctor Strange khi danh tính của anh bị lộ.',
        'https://example.com/poster_spiderman.jpg',
        '2024-07-05'
    ),
    (
        'Dune',
        'Khoa học viễn tưởng',
        155,
        'Denis Villeneuve',
        'Timothée Chalamet, Rebecca Ferguson',
        'Câu chuyện về Paul Atreides, người được định mệnh cai trị hành tinh sa mạc Arrakis.',
        'https://example.com/poster_dune.jpg',
        '2024-07-12'
    ),
    (
        'The Batman',
        'Hành động, Tội phạm',
        176,
        'Matt Reeves',
        'Robert Pattinson, Zoë Kravitz',
        'Batman năm thứ hai chống lại tội phạm ở Gotham City, đối mặt với Riddler.',
        'https://example.com/poster_batman.jpg',
        '2024-07-19'
    ),
    (
        'Everything Everywhere All at Once',
        'Hành động, Phiêu lưu, Hài',
        139,
        'Daniel Kwan, Daniel Scheinert',
        'Michelle Yeoh, Stephanie Hsu',
        'Một người Mỹ gốc Hoa trung niên bị cuốn vào một cuộc phiêu lưu điên rồ.',
        'https://example.com/poster_eeaao.jpg',
        '2024-07-26'
    ),
    (
        'Top Gun: Maverick',
        'Hành động, Chính kịch',
        130,
        'Joseph Kosinski',
        'Tom Cruise, Miles Teller',
        'Pete "Maverick" Mitchell huấn luyện một nhóm phi công trẻ cho một nhiệm vụ đặc biệt.',
        'https://example.com/poster_topgun.jpg',
        '2024-08-02'
    ),
    (
        'The Northman',
        'Hành động, Phiêu lưu, Chính kịch',
        136,
        'Robert Eggers',
        'Alexander Skarsgård, Nicole Kidman',
        'Một hoàng tử Viking tìm cách trả thù cho cái chết của cha mình.',
        'https://example.com/poster_northman.jpg',
        '2024-08-09'
    ),
    (
        'Elvis',
        'Tiểu sử, Âm nhạc',
        159,
        'Baz Luhrmann',
        'Austin Butler, Tom Hanks',
        'Câu chuyện về cuộc đời và sự nghiệp của Elvis Presley.',
        'https://example.com/poster_elvis.jpg',
        '2024-08-16'
    ),
    (
        'Thor: Love and Thunder',
        'Hành động, Phiêu lưu, Hài',
        119,
        'Taika Waititi',
        'Chris Hemsworth, Natalie Portman',
        'Thor hợp tác với Valkyrie, Korg, và Jane Foster để chống lại Gorr the God Butcher.',
        'https://example.com/poster_thor.jpg',
        '2024-08-23'
    ),
    (
        'Doctor Strange in the Multiverse of Madness',
        'Hành động, Phiêu lưu, Kỳ ảo',
        126,
        'Sam Raimi',
        'Benedict Cumberbatch, Elizabeth Olsen',
        'Doctor Strange du hành vào đa vũ trụ để đối mặt với một mối đe dọa mới.',
        'https://example.com/poster_drstrange.jpg',
        '2024-08-30'
    ),
    (
        'The Lost City',
        'Hành động, Phiêu lưu, Hài',
        112,
        'Aaron Nee, Adam Nee',
        'Sandra Bullock, Channing Tatum',
        'Một tiểu thuyết gia lãng mạn bị bắt cóc và buộc phải tham gia vào một cuộc phiêu lưu.',
        'https://example.com/poster_lostcity.jpg',
        '2024-09-06'
    );

INSERT INTO
    phong_chieu (ten_phong, so_ghe)
VALUES
    ('Phòng 1', 100),
    ('Phòng 2', 150),
    ('Phòng 3', 80),
    ('Phòng 4', 120),
    ('Phòng 5', 90),
    ('Phòng 6', 110),
    ('Phòng 7', 70),
    ('Phòng 8', 130),
    ('Phòng 9', 140),
    ('Phòng 10', 60);

INSERT INTO
    lich_chieu (ma_phim, ma_phong, ngay_chieu, gio_chieu, gia_ve)
VALUES
    (1, 1, '2024-07-05', '10:30:00', 80000),
    (1, 2, '2024-07-05', '13:00:00', 80000),
    (2, 3, '2024-07-12', '15:45:00', 100000),
    (3, 1, '2024-07-19', '18:15:00', 90000),
    (4, 2, '2024-07-26', '20:30:00', 85000),
    (5, 3, '2024-08-02', '10:00:00', 95000),
    (6, 1, '2024-08-09', '12:15:00', 110000),
    (7, 2, '2024-08-16', '14:30:00', 105000),
    (8, 3, '2024-08-23', '17:00:00', 90000),
    (9, 1, '2024-08-30', '19:30:00', 85000);

INSERT INTO
    ve (ma_lich_chieu, so_ghe, gia_ve)
VALUES
    (1, 'A1', 80000),
    (1, 'A2', 80000),
    (2, 'B5', 100000),
    (3, 'C10', 90000),
    (4, 'D8', 85000),
    (5, 'E3', 95000),
    (6, 'F12', 110000),
    (7, 'G7', 105000),
    (8, 'H4', 90000),
    (9, 'I9', 85000);

INSERT INTO
    khach_hang (ten_khach_hang, email, so_dien_thoai)
VALUES
    (
        'Nguyễn Văn Khiêm',
        'nguyena@gmail.com',
        '0912345678'
    ),
    ('Trần Thị Lam', 'tranb@gmail.com', '0987654321'),
    ('Lê Văn Dùng', 'levanc@yahoo.com', '0901234567'),
    ('Phạm Thị Hồng', 'phamd@gmail.com', '0987654322'),
    ('Hoàng Văn Thụ', 'hoange@yahoo.com', '0912345679'),
    ('Vũ Thị Hương', 'vuf@gmail.com', '0987654323'),
    ('Đỗ Văn Giam1', 'dog@yahoo.com', '0901234568'),
    (
        'Trương Thị Định',
        'truongh@gmail.com',
        '0987654324'
    ),
    ('Bùi Văn Công', 'buii@yahoo.com', '0912345680'),
    ('Ngô Thị Tuệ', 'ngok@gmail.com', '0987654325');

INSERT INTO
    doanh_thu_ngay (
        ngay,
        ma_lich_chieu,
        tong_doanh_thu,
        so_ve_ban_duoc
    )
VALUES
    ('2024-07-05', 1, 160000, 2),
    ('2024-07-05', 2, 160000, 2),
    ('2024-07-12', 3, 100000, 1),
    ('2024-07-19', 4, 90000, 1),
    ('2024-07-26', 5, 85000, 1),
    ('2024-08-02', 6, 95000, 1),
    ('2024-08-09', 7, 110000, 1),
    ('2024-08-16', 8, 105000, 1),
    ('2024-08-23', 9, 90000, 1),
    ('2024-08-30', 10, 85000, 1);

INSERT INTO
    hoa_don (ma_khach_hang, ngay_lap, tong_tien)
VALUES
    (1, '2024-07-05', 160000), -- Khách hàng 1 mua vé vào ngày 5/7/2024
    (2, '2024-07-05', 80000), -- Khách hàng 2 mua vé vào ngày 5/7/2024
    (3, '2024-07-12', 100000), -- Khách hàng 3 mua vé vào ngày 12/7/2024
    (4, '2024-07-19', 90000), -- Khách hàng 4 mua vé vào ngày 19/7/2024
    (5, '2024-07-26', 85000), -- Khách hàng 5 mua vé vào ngày 26/7/2024
    (6, '2024-08-02', 95000), -- Khách hàng 6 mua vé vào ngày 2/8/2024
    (7, '2024-08-09', 110000), -- Khách hàng 7 mua vé vào ngày 9/8/2024
    (8, '2024-08-16', 105000), -- Khách hàng 8 mua vé vào ngày 16/8/2024
    (9, '2024-08-23', 90000), -- Khách hàng 9 mua vé vào ngày 23/8/2024
    (10, '2024-08-30', 85000);

INSERT INTO
    chi_tiet_hoa_don (ma_hoa_don, ma_ve)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5),
    (5, 6),
    (6, 7),
    (7, 8),
    (8, 9),
    (9, 10);

