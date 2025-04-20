/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

INSERT INTO `addresses` (`id`, `user_id`, `name`, `phone`, `address`, `is_default`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Nguyễn Trọng Trường', '0334011350', 'Phuc Bo, Ngoc Lam, My Hao, Hung Yen', '1', '2025-04-20 09:14:07', '2025-04-20 09:14:07');
INSERT INTO `addresses` (`id`, `user_id`, `name`, `phone`, `address`, `is_default`, `createdAt`, `updatedAt`) VALUES
(2, 1, 'Nguyễn Trọng Trường', '0334011350', 'Số 8, Ngách 53, Ngõ 68 Triều Khúc', '0', '2025-04-20 09:38:01', '2025-04-20 09:38:05');


INSERT INTO `cart_items` (`id`, `product_variant_id`, `cart_id`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 10, 2, 1, '2025-04-20 08:37:32', '2025-04-20 08:37:32');
INSERT INTO `cart_items` (`id`, `product_variant_id`, `cart_id`, `quantity`, `createdAt`, `updatedAt`) VALUES
(2, 1, 2, 3, '2025-04-20 09:20:07', '2025-04-20 09:20:07');


INSERT INTO `carts` (`id`, `user_id`, `createdAt`, `updatedAt`) VALUES
(2, 1, '2025-04-20 07:38:33', '2025-04-20 07:38:33');


INSERT INTO `categories` (`id`, `name`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Áo', NULL, '2025-04-20 07:39:49', '2025-04-20 07:39:49');
INSERT INTO `categories` (`id`, `name`, `image`, `createdAt`, `updatedAt`) VALUES
(2, 'Quần', NULL, '2025-04-20 07:39:56', '2025-04-20 07:39:56');
INSERT INTO `categories` (`id`, `name`, `image`, `createdAt`, `updatedAt`) VALUES
(3, 'Đầm', NULL, '2025-04-20 08:13:14', '2025-04-20 08:13:14');

INSERT INTO `order_details` (`id`, `order_id`, `product_variant_id`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES
(1, 1, 10, 1, NULL, '2025-04-20 08:40:00', '2025-04-20 08:40:00');
INSERT INTO `order_details` (`id`, `order_id`, `product_variant_id`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES
(2, 2, 1, 3, NULL, '2025-04-20 09:20:19', '2025-04-20 09:20:19');


INSERT INTO `orders` (`id`, `user_id`, `total_price`, `status`, `payment`, `address_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, 999, 'ordered', NULL, 1, '2025-04-20 08:40:00', '2025-04-20 08:40:00');
INSERT INTO `orders` (`id`, `user_id`, `total_price`, `status`, `payment`, `address_id`, `createdAt`, `updatedAt`) VALUES
(2, 1, 3297, 'ordered', 0, 1, '2025-04-20 09:20:19', '2025-04-20 09:20:19');


INSERT INTO `product_images` (`id`, `product_id`, `path`, `createdAt`, `updatedAt`) VALUES
(1, 1, '/images/product_images-1745135547610-396376321.jpg', '2025-04-20 07:52:27', '2025-04-20 07:52:27');
INSERT INTO `product_images` (`id`, `product_id`, `path`, `createdAt`, `updatedAt`) VALUES
(2, 1, '/images/product_images-1745135547610-95293152.jpg', '2025-04-20 07:52:27', '2025-04-20 07:52:27');
INSERT INTO `product_images` (`id`, `product_id`, `path`, `createdAt`, `updatedAt`) VALUES
(3, 1, '/images/product_images-1745135547612-429794201.jpg', '2025-04-20 07:52:27', '2025-04-20 07:52:27');
INSERT INTO `product_images` (`id`, `product_id`, `path`, `createdAt`, `updatedAt`) VALUES
(4, 1, '/images/product_images-1745135547613-829227046.jpg', '2025-04-20 07:52:27', '2025-04-20 07:52:27'),
(5, 1, '/images/product_images-1745135547615-941991245.jpg', '2025-04-20 07:52:27', '2025-04-20 07:52:27'),
(6, 2, '/images/product_images-1745135672444-745033159.jpg', '2025-04-20 07:54:32', '2025-04-20 07:54:32'),
(7, 2, '/images/product_images-1745135672445-809033140.jpg', '2025-04-20 07:54:32', '2025-04-20 07:54:32'),
(8, 2, '/images/product_images-1745135672447-311631470.jpg', '2025-04-20 07:54:32', '2025-04-20 07:54:32'),
(9, 2, '/images/product_images-1745135672448-80329964.jpg', '2025-04-20 07:54:32', '2025-04-20 07:54:32'),
(10, 3, '/images/product_images-1745135816279-39049606.jpg', '2025-04-20 07:56:56', '2025-04-20 07:56:56'),
(11, 3, '/images/product_images-1745135816279-3103689.jpg', '2025-04-20 07:56:56', '2025-04-20 07:56:56'),
(12, 3, '/images/product_images-1745135816280-974101417.jpg', '2025-04-20 07:56:56', '2025-04-20 07:56:56'),
(13, 3, '/images/product_images-1745135816281-500520644.jpg', '2025-04-20 07:56:56', '2025-04-20 07:56:56'),
(14, 4, '/images/product_images-1745135948131-24235562.jpg', '2025-04-20 07:59:08', '2025-04-20 07:59:08'),
(15, 4, '/images/product_images-1745135948131-647143778.jpg', '2025-04-20 07:59:08', '2025-04-20 07:59:08'),
(16, 4, '/images/product_images-1745135948131-205254625.jpg', '2025-04-20 07:59:08', '2025-04-20 07:59:08'),
(17, 4, '/images/product_images-1745135948131-567557216.jpg', '2025-04-20 07:59:08', '2025-04-20 07:59:08'),
(18, 5, '/images/product_images-1745136070805-837625125.jpg', '2025-04-20 08:01:10', '2025-04-20 08:01:10'),
(19, 5, '/images/product_images-1745136070805-836717295.jpg', '2025-04-20 08:01:10', '2025-04-20 08:01:10'),
(20, 5, '/images/product_images-1745136070805-94289314.jpg', '2025-04-20 08:01:10', '2025-04-20 08:01:10'),
(21, 5, '/images/product_images-1745136070805-120710351.jpg', '2025-04-20 08:01:10', '2025-04-20 08:01:10'),
(22, 6, '/images/product_images-1745136254670-773805784.jpg', '2025-04-20 08:04:14', '2025-04-20 08:04:14'),
(23, 6, '/images/product_images-1745136254670-949983487.jpg', '2025-04-20 08:04:14', '2025-04-20 08:04:14'),
(24, 6, '/images/product_images-1745136254670-585631326.jpg', '2025-04-20 08:04:14', '2025-04-20 08:04:14'),
(25, 6, '/images/product_images-1745136254670-530018554.jpg', '2025-04-20 08:04:14', '2025-04-20 08:04:14'),
(26, 7, '/images/product_images-1745136374506-416193328.jpg', '2025-04-20 08:06:14', '2025-04-20 08:06:14'),
(27, 7, '/images/product_images-1745136374506-247546522.jpg', '2025-04-20 08:06:14', '2025-04-20 08:06:14'),
(28, 7, '/images/product_images-1745136374506-654511326.jpg', '2025-04-20 08:06:14', '2025-04-20 08:06:14'),
(29, 7, '/images/product_images-1745136374506-49757550.jpg', '2025-04-20 08:06:14', '2025-04-20 08:06:14'),
(30, 7, '/images/product_images-1745136374506-225373456.jpg', '2025-04-20 08:06:14', '2025-04-20 08:06:14'),
(31, 8, '/images/product_images-1745136511758-234137041.jpg', '2025-04-20 08:08:31', '2025-04-20 08:08:31'),
(32, 8, '/images/product_images-1745136511758-278096506.jpg', '2025-04-20 08:08:31', '2025-04-20 08:08:31'),
(33, 8, '/images/product_images-1745136511758-906041933.jpg', '2025-04-20 08:08:31', '2025-04-20 08:08:31'),
(34, 8, '/images/product_images-1745136511759-23667175.jpg', '2025-04-20 08:08:31', '2025-04-20 08:08:31'),
(35, 9, '/images/product_images-1745136653361-234425363.jpg', '2025-04-20 08:10:53', '2025-04-20 08:10:53'),
(36, 9, '/images/product_images-1745136653363-301079556.jpg', '2025-04-20 08:10:53', '2025-04-20 08:10:53'),
(37, 9, '/images/product_images-1745136653363-254547738.jpg', '2025-04-20 08:10:53', '2025-04-20 08:10:53'),
(38, 9, '/images/product_images-1745136653364-989572919.jpg', '2025-04-20 08:10:53', '2025-04-20 08:10:53'),
(39, 10, '/images/product_images-1745136761844-826047274.jpg', '2025-04-20 08:12:41', '2025-04-20 08:12:41'),
(40, 10, '/images/product_images-1745136761845-596963222.jpg', '2025-04-20 08:12:41', '2025-04-20 08:12:41'),
(41, 10, '/images/product_images-1745136761846-559464189.jpg', '2025-04-20 08:12:41', '2025-04-20 08:12:41'),
(42, 10, '/images/product_images-1745136761846-65611127.jpg', '2025-04-20 08:12:41', '2025-04-20 08:12:41'),
(43, 11, '/images/product_images-1745136898223-893974213.jpg', '2025-04-20 08:14:58', '2025-04-20 08:14:58'),
(44, 11, '/images/product_images-1745136898224-752905586.jpg', '2025-04-20 08:14:58', '2025-04-20 08:14:58'),
(45, 11, '/images/product_images-1745136898226-632762494.jpg', '2025-04-20 08:14:58', '2025-04-20 08:14:58'),
(46, 11, '/images/product_images-1745136898227-720109325.jpg', '2025-04-20 08:14:58', '2025-04-20 08:14:58'),
(47, 12, '/images/product_images-1745137045352-52105057.jpg', '2025-04-20 08:17:25', '2025-04-20 08:17:25'),
(48, 12, '/images/product_images-1745137045353-34401087.jpg', '2025-04-20 08:17:25', '2025-04-20 08:17:25'),
(49, 12, '/images/product_images-1745137045354-79930791.jpg', '2025-04-20 08:17:25', '2025-04-20 08:17:25'),
(50, 12, '/images/product_images-1745137045355-104838732.jpg', '2025-04-20 08:17:25', '2025-04-20 08:17:25');

INSERT INTO `product_variant_values` (`id`, `product_id`, `price`, `old_price`, `stock`, `sku`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1099, 1200, 17, '1', '2025-04-20 07:52:27', '2025-04-20 09:20:19');
INSERT INTO `product_variant_values` (`id`, `product_id`, `price`, `old_price`, `stock`, `sku`, `createdAt`, `updatedAt`) VALUES
(2, 1, 1099, 1200, 20, '2', '2025-04-20 07:52:27', '2025-04-20 07:52:27');
INSERT INTO `product_variant_values` (`id`, `product_id`, `price`, `old_price`, `stock`, `sku`, `createdAt`, `updatedAt`) VALUES
(3, 1, 1000, 1200, 10, '3', '2025-04-20 07:52:27', '2025-04-20 07:52:27');
INSERT INTO `product_variant_values` (`id`, `product_id`, `price`, `old_price`, `stock`, `sku`, `createdAt`, `updatedAt`) VALUES
(4, 2, 799, 900, 30, '1', '2025-04-20 07:54:32', '2025-04-20 07:54:32'),
(5, 2, 799, 900, 40, '2', '2025-04-20 07:54:32', '2025-04-20 07:54:32'),
(6, 2, 799, 900, 20, '3', '2025-04-20 07:54:32', '2025-04-20 07:54:32'),
(7, 2, 700, 900, 10, '4', '2025-04-20 07:54:32', '2025-04-20 07:54:32'),
(8, 3, 999, 1100, 50, '1', '2025-04-20 07:56:56', '2025-04-20 07:56:56'),
(9, 3, 999, 1100, 50, '2', '2025-04-20 07:56:56', '2025-04-20 07:56:56'),
(10, 3, 999, 1100, 59, '3', '2025-04-20 07:56:56', '2025-04-20 08:40:00'),
(11, 4, 999, 1200, 50, '1', '2025-04-20 07:59:08', '2025-04-20 07:59:08'),
(12, 4, 999, 1200, 50, '2', '2025-04-20 07:59:08', '2025-04-20 07:59:08'),
(13, 4, 999, 1200, 50, '3', '2025-04-20 07:59:08', '2025-04-20 07:59:08'),
(14, 5, 500, 750, 50, '1', '2025-04-20 08:01:10', '2025-04-20 08:01:10'),
(15, 5, 500, 750, 50, '2', '2025-04-20 08:01:10', '2025-04-20 08:01:10'),
(16, 5, 500, 750, 50, '3', '2025-04-20 08:01:10', '2025-04-20 08:01:10'),
(17, 6, 1999, 2100, 50, '1', '2025-04-20 08:04:14', '2025-04-20 08:04:14'),
(18, 6, 1999, 2100, 50, '2', '2025-04-20 08:04:14', '2025-04-20 08:04:14'),
(19, 6, 1999, 2100, 50, '3', '2025-04-20 08:04:14', '2025-04-20 08:04:14'),
(20, 7, 1599, 1700, 50, '1', '2025-04-20 08:06:14', '2025-04-20 08:06:14'),
(21, 7, 1599, 1700, 50, '2', '2025-04-20 08:06:14', '2025-04-20 08:06:14'),
(22, 7, 1599, 1700, 50, '3', '2025-04-20 08:06:14', '2025-04-20 08:06:14'),
(23, 8, 1599, 1700, 50, '1', '2025-04-20 08:08:31', '2025-04-20 08:08:31'),
(24, 8, 1599, 1700, 50, '2', '2025-04-20 08:08:31', '2025-04-20 08:08:31'),
(25, 8, 1599, 1700, 50, '3', '2025-04-20 08:08:31', '2025-04-20 08:08:31'),
(26, 9, 1799, 2000, 50, '1', '2025-04-20 08:10:53', '2025-04-20 08:10:53'),
(27, 9, 1799, 2000, 50, '2', '2025-04-20 08:10:53', '2025-04-20 08:10:53'),
(28, 9, 1799, 2000, 50, '3', '2025-04-20 08:10:53', '2025-04-20 08:10:53'),
(29, 10, 1799, 2000, 50, '1', '2025-04-20 08:12:41', '2025-04-20 08:12:41'),
(30, 10, 1799, 2000, 50, '2', '2025-04-20 08:12:41', '2025-04-20 08:12:41'),
(31, 10, 1799, 2000, 50, '3', '2025-04-20 08:12:41', '2025-04-20 08:12:41'),
(32, 11, 1799, 2000, 50, '1', '2025-04-20 08:14:58', '2025-04-20 08:14:58'),
(33, 11, 1799, 2000, 50, '2', '2025-04-20 08:14:58', '2025-04-20 08:14:58'),
(34, 11, 1799, 2000, 50, '3', '2025-04-20 08:14:58', '2025-04-20 08:14:58'),
(35, 12, 3500, 3999, 50, '1', '2025-04-20 08:17:25', '2025-04-20 08:17:25'),
(36, 12, 3500, 3999, 50, '2', '2025-04-20 08:17:25', '2025-04-20 08:17:25'),
(37, 12, 3500, 3999, 50, '3', '2025-04-20 08:17:25', '2025-04-20 08:17:25');

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `category_id`, `section_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Áo phông dệt kim in họa tiết', 'Áo phông vải dệt kim sợi cotton, dáng relaxed fit. Cổ tròn, cộc tay. In họa tiết khác màu phía trước. Kiểu bạc màu. Sản phẩm này có vẻ ngoài độc đáo nhờ vào quá trình giặt đặc biệt. Do đó, màu sắc thực tế của sản phẩm có thể có khác biệt nhỏ so với hình ảnh.', 1099, 47, 1, 1, '2025-04-20 07:52:27', '2025-04-20 09:20:19');
INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `category_id`, `section_id`, `createdAt`, `updatedAt`) VALUES
(2, 'Áo phông in họa tiết khác màu', 'Áo phông dáng relaxed fit. Cổ tròn, cộc tay. In họa tiết khác màu phía trước và sau lưng.', 799, 100, 1, 1, '2025-04-20 07:54:32', '2025-04-20 07:54:32');
INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `category_id`, `section_id`, `createdAt`, `updatedAt`) VALUES
(3, 'Áo phông dệt kim in họa tiết kiểu bạc màu', 'Áo phông vải cotton dệt kim, dáng boxy fit. Cổ tròn, cộc tay. In họa tiết hiệu ứng bạc màu và khác màu ở phía trước. Sản phẩm này có vẻ ngoài độc đáo nhờ vào quá trình giặt đặc biệt. Do đó, màu sắc thực tế của sản phẩm có thể có khác biệt nhỏ so với hình ảnh.', 999, 159, 1, 1, '2025-04-20 07:56:56', '2025-04-20 08:40:00');
INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `category_id`, `section_id`, `createdAt`, `updatedAt`) VALUES
(4, 'Áo phông vải dệt dáng relaxed fit', 'Áo phông dáng relaxed fit. Cổ tròn, cộc tay.', 999, 150, 1, 1, '2025-04-20 07:59:08', '2025-04-20 07:59:08'),
(5, 'Áo phông cơ bản vải dệt Interlock', 'Áo phông vải cotton co giãn, dáng regular fit. Cổ tròn, cộc tay.', 500, 150, 1, 1, '2025-04-20 08:01:10', '2025-04-20 08:01:10'),
(6, 'Quần âu theo bộ suit vải linen - lyocell', 'Quần vải pha sợi lyocell và sợi linen, dáng relaxed fit. Cạp phối chi tiết xếp li. Có hai túi phía trước và hai túi may viền phía sau. Cài phía trước bằng khóa kéo và khuy.', 1999, 150, 2, 1, '2025-04-20 08:04:14', '2025-04-20 08:04:14'),
(7, 'Quần âu theo bộ suit thiết kế thoải mái', 'Quần vải viscose, dáng slim fit. Có hai túi phía trước và hai túi may viền phía sau. Cài phía trước bằng khóa kéo và khuy.', 1599, 150, 2, 1, '2025-04-20 08:06:14', '2025-04-20 08:06:14'),
(8, 'Quần straight fit vải linen - cotton', 'Quần vải pha sợi linen và sợi cotton, dáng relaxed straight fit. Cạp điều chỉnh bằng dây rút. Có hai túi phía trước và hai túi đáp có nắp phía sau. Cài phía trước bằng khóa kéo và khuy.', 1599, 150, 2, 1, '2025-04-20 08:08:31', '2025-04-20 08:08:31'),
(9, 'Quần carpenter họa tiết trừu tượng', 'Quần dáng relaxed straight fit. Có 5 túi. Kiểu bạc màu. Kèm dây đai và túi đa năng ở hai bên ống quần. Cài khóa kéo và khuy.', 1799, 150, 2, 1, '2025-04-20 08:10:53', '2025-04-20 08:10:53'),
(10, 'Quần vải kỹ thuật xếp ly', 'Quần dáng relaxed fit, chất liệu vải kỹ thuật dệt ripstop chống rách. Cạp co giãn, kèm thắt lưng để điều chỉnh. Xếp li phía trước. Có hai túi phía trước và hai túi may viền phía sau. Thành phần: 88% vải poliamit, 12% elastane', 1799, 150, 2, 1, '2025-04-20 08:12:41', '2025-04-20 08:12:41'),
(11, 'Đầm MIDI vải pha LINEN', 'Đầm vải pha linen. Cổ chữ V có ve lật, tay sát nách. Có các chi tiết nắp túi giả trang trí. Eo may chiết, may con đỉa hai bên. Cài phía trước bằng khuy cài.', 1799, 150, 3, 2, '2025-04-20 08:14:58', '2025-04-20 08:14:58'),
(12, 'Đầm in họa tiết ZW COLLECTION', 'ZARA WOMAN COLLECTION - Đầm MIDI chất liệu 16% lụa. Cổ chữ V, có hai dây đeo vai mảnh. Phối chỉ kim tuyến trang trí.\nLỚP NGOÀI\n81% vải thun vitcô\n16% lụa tơ tằm\n3% sợi phủ kim loại\nLỚP LÓT\n100% vải pôliexte', 3500, 150, 3, 2, '2025-04-20 08:17:25', '2025-04-20 08:17:25');



INSERT INTO `sections` (`id`, `name`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Nam', NULL, '2025-04-20 07:40:08', '2025-04-20 07:40:08');
INSERT INTO `sections` (`id`, `name`, `image`, `createdAt`, `updatedAt`) VALUES
(2, 'Nữ', NULL, '2025-04-20 07:40:13', '2025-04-20 07:40:13');


INSERT INTO `SequelizeMeta` (`name`) VALUES
('20250327063824-create-users.js');
INSERT INTO `SequelizeMeta` (`name`) VALUES
('20250327063832-create-address.js');
INSERT INTO `SequelizeMeta` (`name`) VALUES
('20250327063838-create-categories.js');
INSERT INTO `SequelizeMeta` (`name`) VALUES
('20250327063843-create-section.js'),
('20250327063847-create-products.js'),
('20250327063854-create-product-images.js'),
('20250327063857-create-product-variant-values.js'),
('20250327063902-create-orders.js'),
('20250327063906-create-order-details.js'),
('20250327063910-create-reviews.js'),
('20250327063914-create-carts.js'),
('20250327063922-create-cart-items.js'),
('20250327063926-create-variants.js'),
('20250327063930-create-variant-values.js');

INSERT INTO `users` (`id`, `email`, `type`, `firstname`, `lastname`, `password`, `role`, `avatar`, `createdAt`, `updatedAt`) VALUES
(1, 'ntt26072003@gmail.com', 'GOOGLE', NULL, 'Trường', NULL, 'admin', 'https://lh3.googleusercontent.com/a/ACg8ocKg8t5g1DrK-Cre7PgyJ1wUbzTPU5dr_vts0f5B05Q8K91zKp24=s96-c', '2025-04-20 07:38:31', '2025-04-20 07:38:31');


INSERT INTO `variant_values` (`id`, `name`, `variant_id`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'M', 1, '/images/variant_images-1745135547615-434527432.jpg', '2025-04-20 07:52:27', '2025-04-20 07:52:27');
INSERT INTO `variant_values` (`id`, `name`, `variant_id`, `image`, `createdAt`, `updatedAt`) VALUES
(2, 'L', 2, '/images/variant_images-1745135547615-50839135.jpg', '2025-04-20 07:52:27', '2025-04-20 07:52:27');
INSERT INTO `variant_values` (`id`, `name`, `variant_id`, `image`, `createdAt`, `updatedAt`) VALUES
(3, 'XL', 3, '/images/variant_images-1745135547616-683574176.jpg', '2025-04-20 07:52:27', '2025-04-20 07:52:27');
INSERT INTO `variant_values` (`id`, `name`, `variant_id`, `image`, `createdAt`, `updatedAt`) VALUES
(4, 'XXL', 1, '/images/variant_images-1745135672452-667988902.jpg', '2025-04-20 07:54:32', '2025-04-20 07:54:32');

INSERT INTO `variants` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Size', '2025-04-20 07:52:27', '2025-04-20 07:52:27');
INSERT INTO `variants` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(2, 'Size', '2025-04-20 07:52:27', '2025-04-20 07:52:27');
INSERT INTO `variants` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(3, 'Size', '2025-04-20 07:52:27', '2025-04-20 07:52:27');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;