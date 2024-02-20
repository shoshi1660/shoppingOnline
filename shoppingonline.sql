-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: מרץ 02, 2023 בזמן 10:48 PM
-- גרסת שרת: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoppingonline`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `cities`
--

CREATE TABLE `cities` (
  `idCity` int(2) NOT NULL,
  `cityName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `cities`
--

INSERT INTO `cities` (`idCity`, `cityName`) VALUES
(70, 'אשדוד'),
(3000, 'ירושלים'),
(4000, 'חיפה'),
(5000, 'תל אביב'),
(6100, 'בני ברק'),
(6600, 'חולון'),
(7400, 'נתניה'),
(7900, 'פתח תקווה'),
(8300, 'ראשון לציון'),
(9000, 'באר שבע');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `client`
--

CREATE TABLE `client` (
  `clientIdentity` int(9) NOT NULL,
  `clientName` varchar(20) NOT NULL,
  `clientLastName` varchar(20) NOT NULL,
  `clientUserName` varchar(20) NOT NULL,
  `clientEmail` varchar(30) NOT NULL,
  `clientPassword` varchar(20) NOT NULL,
  `role` int(20) DEFAULT NULL,
  `idCity` int(2) DEFAULT NULL,
  `street` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `client`
--

INSERT INTO `client` (`clientIdentity`, `clientName`, `clientLastName`, `clientUserName`, `clientEmail`, `clientPassword`, `role`, `idCity`, `street`) VALUES
(14824262, 'אליהו', 'גפני', 'eli0909', '44@gmail.com', 'eli0909', NULL, 6100, 'הגפן'),
(203384219, 'יוסף', 'ליין', 'יוסף ליין', 'navvkuh052@gmail.com', '124578', NULL, 3000, 'סורוצקין'),
(204845481, 'מיכל', 'כהן', 'atggga', 'navvkuh052@gmail.com', '25412541', NULL, 7400, 'הרואה'),
(204910111, 'יוסף', 'כהן', 'poiuyt', 'navvkuh052@gmail.com', '147852', NULL, 4000, 'חזון איש 86'),
(206000333, 'מושיקו', 'הורביץ', 'משה הורביץ', 'navvkuh052@gmail.com', '326598', NULL, 4000, 'חזון איש 86'),
(206367385, 'יוסף', '2222222222222', 'ראובן המלך', 'navvkuh052@gmail.com', '951159', NULL, 70, 'פתח תקוה'),
(206367393, 'חיים', 'לים', 'טעמא לים', 'navvkuh052@gmail.com', '951951', NULL, 3000, 'חזון איש 86'),
(236531638, 'משה', 'כהן', '265316', '265316@gmail.com', '265316', NULL, 8300, 'בן אליעזר'),
(316339753, 'שושנה', 'לוין', 'shosh16', 'shoshi1660@gmail.com', 'Shoshi', 1, 3000, 'בן עזאי'),
(343731147, 'ישראל', 'ישראלי', 'jhnbvnb', '44@gmail.com', '874125', NULL, 5000, 'קרית צאנז 14');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `itemcart`
--

CREATE TABLE `itemcart` (
  `idItem` int(20) NOT NULL,
  `idProduct` int(20) NOT NULL,
  `productQuantity` int(5) NOT NULL,
  `generalPrice` int(5) NOT NULL,
  `idCart` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `itemcart`
--

INSERT INTO `itemcart` (`idItem`, `idProduct`, `productQuantity`, `generalPrice`, `idCart`) VALUES
(298, 5, 9, 1125, 30831),
(299, 4, 6, 1800, 30831),
(300, 8, 6, 720, 30831),
(301, 7, 6, 1500, 30831),
(302, 12, 21, 3738, 30831),
(312, 2, 1, 60, 30834),
(316, 5, 1, 125, 30837),
(317, 4, 12, 3600, 30837),
(318, 2, 7, 420, 30837),
(319, 4, 2, 600, 30838),
(320, 3, 3, 3366, 30838),
(321, 8, 11, 1320, 30838),
(331, 5, 1, 125, 30841),
(332, 4, 1, 300, 30841),
(333, 10, 1, 90, 30841),
(337, 3, 2, 2244, 30842),
(338, 8, 1, 120, 30842),
(342, 5, 1, 125, 30844),
(343, 4, 1, 300, 30845),
(344, 9, 4, 4760, 30845),
(345, 8, 3, 360, 30845),
(346, 2, 1, 60, 30846),
(347, 5, 1, 125, 30846),
(361, 10, 1, 90, 30853),
(362, 5, 1, 125, 30853),
(364, 5, 1, 125, 30855),
(365, 10, 1, 90, 30855),
(382, 5, 6, 750, 30864),
(409, 2, 1, 60, 30872);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `order`
--

CREATE TABLE `order` (
  `idOrder` int(20) NOT NULL,
  `clientIdentity` int(9) NOT NULL,
  `idCart` int(20) NOT NULL,
  `finalPrice` int(20) NOT NULL,
  `idCity` int(2) NOT NULL,
  `street` varchar(30) NOT NULL,
  `shipingDate` date NOT NULL,
  `orderDate` date NOT NULL DEFAULT current_timestamp(),
  `fourLastDigits` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `order`
--

INSERT INTO `order` (`idOrder`, `clientIdentity`, `idCart`, `finalPrice`, `idCity`, `street`, `shipingDate`, `orderDate`, `fourLastDigits`) VALUES
(79, 203384219, 30831, 8883, 3000, 'סורוצקין', '2023-03-09', '2023-03-01', 6220),
(81, 203384219, 30834, 60, 3000, 'סורוצקין', '2023-03-07', '2023-03-01', 9890),
(82, 206000333, 30837, 425, 4000, 'חזון איש 86', '2023-03-19', '2023-03-01', 9890),
(83, 343731147, 30839, 215, 5000, 'קרית צאנז 14', '2023-03-21', '2023-03-02', 5962),
(84, 343731147, 30841, 515, 5000, 'קרית צאנז 14', '2023-03-31', '2023-03-02', 5962),
(85, 343731147, 30842, 2364, 5000, 'קרית צאנז 14', '2023-03-30', '2023-03-02', 5962),
(86, 236531638, 30844, 125, 8300, 'בן אליעזר', '2023-03-02', '2023-03-02', 5962),
(87, 14824262, 30853, 90, 6100, 'הגפן', '2023-03-22', '2023-03-02', 5962),
(88, 14824262, 30865, 4072, 6100, 'הגפן', '2023-03-30', '2023-03-02', 5962);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `product`
--

CREATE TABLE `product` (
  `idProduct` int(20) NOT NULL,
  `productName` varchar(30) NOT NULL,
  `idCategory` int(20) NOT NULL,
  `productPrice` int(20) NOT NULL,
  `productImage` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `product`
--

INSERT INTO `product` (`idProduct`, `productName`, `idCategory`, `productPrice`, `productImage`) VALUES
(1, 'סדין יחיד', 111, 67, '4.jpg'),
(2, 'מגבת רחצה', 222, 60, 'מגבת.webp'),
(3, 'סט מצעים יוקרתי', 333, 1122, '2.jpg'),
(4, 'סט 6 מגבות', 222, 300, 'מגבת1.webp'),
(5, 'שמיכת פליז', 111, 125, 'שמיכת פליז אדומה.jpg'),
(6, 'סט 3 מגבות מטבח', 222, 70, 'סט מגבות מטבח.webp'),
(7, 'סט מצעים חלק', 111, 250, '3.jpg'),
(8, 'סט כחול איכותי', 111, 120, '1.png'),
(9, 'מיטה רחבה', 333, 1190, '0.jpg'),
(10, 'שמיכת קיץ', 333, 90, 'שמיכת קיץ.webp'),
(11, 'מפיץ ריח ', 444, 77, 'ריחן לשרותים.jpg'),
(12, 'מטהר אויר אטומטי', 444, 178, 'מאהר אויר אוטומטי.png');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `productscategory`
--

CREATE TABLE `productscategory` (
  `idCategory` int(20) NOT NULL,
  `categoryName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `productscategory`
--

INSERT INTO `productscategory` (`idCategory`, `categoryName`) VALUES
(111, 'מצעים'),
(222, 'מגבות'),
(333, 'כלי מיטה'),
(444, 'פינוקים לבית');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `shoppingcart`
--

CREATE TABLE `shoppingcart` (
  `idCart` int(20) NOT NULL,
  `clientIdentity` int(9) NOT NULL,
  `cartCreationDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `shoppingcart`
--

INSERT INTO `shoppingcart` (`idCart`, `clientIdentity`, `cartCreationDate`) VALUES
(30831, 203384219, '2023-03-01'),
(30834, 203384219, '2023-03-01'),
(30837, 206000333, '2023-03-01'),
(30838, 206000333, '2023-03-01'),
(30839, 343731147, '2023-03-02'),
(30841, 343731147, '2023-03-02'),
(30842, 343731147, '2023-03-02'),
(30844, 236531638, '2023-03-02'),
(30845, 236531638, '2023-03-02'),
(30846, 343731147, '2023-03-02'),
(30853, 14824262, '2023-03-02'),
(30855, 203384219, '2023-03-02'),
(30864, 206367385, '2023-03-02'),
(30865, 14824262, '2023-03-02'),
(30872, 14824262, '2023-03-02');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`idCity`);

--
-- אינדקסים לטבלה `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`clientIdentity`),
  ADD UNIQUE KEY `clientPassword` (`clientPassword`),
  ADD UNIQUE KEY `clientUserName_3` (`clientUserName`),
  ADD KEY `idCity` (`idCity`),
  ADD KEY `clientUserName` (`clientUserName`),
  ADD KEY `clientUserName_2` (`clientUserName`);

--
-- אינדקסים לטבלה `itemcart`
--
ALTER TABLE `itemcart`
  ADD PRIMARY KEY (`idItem`),
  ADD KEY `idCart` (`idCart`),
  ADD KEY `idProduct` (`idProduct`);

--
-- אינדקסים לטבלה `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`idOrder`),
  ADD KEY `clientIdentity` (`clientIdentity`),
  ADD KEY `idCart` (`idCart`),
  ADD KEY `idCity` (`idCity`);

--
-- אינדקסים לטבלה `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`idProduct`),
  ADD KEY `idCategory` (`idCategory`);

--
-- אינדקסים לטבלה `productscategory`
--
ALTER TABLE `productscategory`
  ADD PRIMARY KEY (`idCategory`);

--
-- אינדקסים לטבלה `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD PRIMARY KEY (`idCart`),
  ADD KEY `clientIdentity` (`clientIdentity`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `itemcart`
--
ALTER TABLE `itemcart`
  MODIFY `idItem` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=410;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `idOrder` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `idProduct` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `productscategory`
--
ALTER TABLE `productscategory`
  MODIFY `idCategory` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=446;

--
-- AUTO_INCREMENT for table `shoppingcart`
--
ALTER TABLE `shoppingcart`
  MODIFY `idCart` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30873;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `client_ibfk_1` FOREIGN KEY (`idCity`) REFERENCES `cities` (`idCity`);

--
-- הגבלות לטבלה `itemcart`
--
ALTER TABLE `itemcart`
  ADD CONSTRAINT `itemcart_ibfk_1` FOREIGN KEY (`idProduct`) REFERENCES `product` (`idProduct`),
  ADD CONSTRAINT `itemcart_ibfk_2` FOREIGN KEY (`idCart`) REFERENCES `shoppingcart` (`idCart`);

--
-- הגבלות לטבלה `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`idCity`) REFERENCES `cities` (`idCity`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`clientIdentity`) REFERENCES `client` (`clientIdentity`),
  ADD CONSTRAINT `order_ibfk_3` FOREIGN KEY (`idCart`) REFERENCES `shoppingcart` (`idCart`);

--
-- הגבלות לטבלה `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`idCategory`) REFERENCES `productscategory` (`idCategory`);

--
-- הגבלות לטבלה `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`clientIdentity`) REFERENCES `client` (`clientIdentity`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
