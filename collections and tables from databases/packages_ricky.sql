-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2020 at 03:35 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travelexperts`
--

-- --------------------------------------------------------

--
-- Table structure for table `packages_ricky`
--

CREATE TABLE `packages_ricky` (
  `PackageId` int(11) NOT NULL,
  `PkgName` varchar(50) NOT NULL,
  `PkgStartDate` date DEFAULT NULL,
  `PkgEndDate` date DEFAULT NULL,
  `PkgDesc` text DEFAULT NULL,
  `PkgBasePrice` decimal(19,4) NOT NULL,
  `PkgAgencyCommission` decimal(19,4) DEFAULT NULL,
  `picName` varchar(50) NOT NULL,
  `keywords` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `packages_ricky`
--

INSERT INTO `packages_ricky` (`PackageId`, `PkgName`, `PkgStartDate`, `PkgEndDate`, `PkgDesc`, `PkgBasePrice`, `PkgAgencyCommission`, `picName`, `keywords`) VALUES
(1, 'Great Wall of China', '2020-12-07', '2020-12-14', 'Come set foot on the longest wall in the world! Spanning 21,000 km, the Great Wall has lasted thousands of years and is visible from space! Enjoy the beautiful view from the towers, plus the delicious foods from Beijing\'s night markets!', '4800.0000', '480.0000', 'vp1.jpg', 'china great wall beijing asia'),
(2, 'Petra', '2020-12-14', '2020-12-21', 'Are you searching for the Holy Grail? Well your search has come to its end! Featured in 1989\'s Indiana Jones and the Last Crusade, this beautiful sandstone structure was the capital of the Nabataean empire and features ingenious water chambers and an indoor oasis -- designed thousands of years ago!', '3000.0000', '300.0000', 'vp2.jpg', 'petra raqmu jordan middle east asia indiana jones'),
(3, 'Colosseum', '2020-12-21', '2020-12-28', 'Spartacus. Maximus Decimus Meridius. Life and death hanging in the balance. Even after thousands of years, the Colosseum emanates greatness and power. If you\'re looking for the source of all the legends, the ampitheatre of all ampitheatres, this tour is for you.', '2800.0000', '280.0000', 'vp3.jpg', 'Colosseum rome italy ampitheatre europe'),
(4, 'Chichen Itza', '2020-12-28', '2021-01-04', 'Are you fascinated by Mayan culture? Do bastions of once great civilizations call to you? Come visit the ancient city of Chichen Itza -- a major political and economic centre of the Mayan empire. Walk the same steps the high priests and ancient rulers did. Feel their stories beneath your feet.', '3000.0000', '300.0000', 'vp4.jpg', 'Chichen Itza maya mayan central america mexico latin america caribbean'),
(5, 'Machu Picchu', '2021-01-04', '2021-01-11', 'Welcome to the mountain citadel of Machu Picchu. This sacred city of the Incan empire features wondrously preserved buildings in the traditional Incan style, including the Temple of the Sun, the Room of the Three Windows and the Intihuatana. Come to Machu Picchu. Come find yourself in the Lost City of the Incas.', '3400.0000', '340.0000', 'vp5.jpg', 'Machu Picchu inca incan Temple Sun Room Three Windows Intihuatana lost city central america peru latin america caribbean'),
(6, 'Taj Mahal', '2021-01-11', '2021-01-18', 'Aptly named the \"Crown of the Palace,\" the Taj Mahal requires no introduction. Lose yourself in these 42 acres of sheer beauty and majesty. The awe-inspiring mosque and the breathtaking gardens are just the beginning of your adventure here. If that\'s not enough, come stroll on the banks of the Yamuna River and explore the streets of Agra. Trust me -- it will be worth it.', '4100.0000', '410.0000', 'vp6.jpg', 'Taj Mahal india asia agra uttar pradesh mosque'),
(7, 'Christ the Redeemer', '2021-01-18', '2021-01-25', 'We welcome you on with open arms on this tour. You have seen pictures of this magnificent structure from afar, but believe me when I say seeing it in person is no comparison. Standing at 38 metres high and stretching 28 metres wide, this statue has overseen the city of Rio de Janeiro for decades. But don\'t you worry, recent restorations have it looking as good as new! Come walk the forever-blessed streets!', '3700.0000', '370.0000', 'vp7.jpg', 'Christ Redeemer rio janeiro brazil south america jesus statue'),
(11, 'Ricky\'s Apartment', '2020-11-02', '2020-11-09', 'Come clean Ricky\'s place, it\'s a mess!', '1400.0000', '140.0000', 'none', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `packages_ricky`
--
ALTER TABLE `packages_ricky`
  ADD PRIMARY KEY (`PackageId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `packages_ricky`
--
ALTER TABLE `packages_ricky`
  MODIFY `PackageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
