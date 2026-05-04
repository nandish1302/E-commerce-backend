    package com.nandish.ecommerce.service;
    import java.util.*;

    import com.nandish.ecommerce.dto.OrderItemDTO;
    import com.nandish.ecommerce.dto.OrderResponseDTO;
    import com.nandish.ecommerce.entity.*;
    import com.nandish.ecommerce.exception.UserNotFoundException;
    import com.nandish.ecommerce.repository.*;
    import com.nandish.ecommerce.repository.OrderRepository;
    import jakarta.transaction.Transactional;
    import lombok.AllArgsConstructor;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    @Service

    public class OrderService {

        @Autowired
        private OrderRepository orderRepository;
        @Autowired
        private  OrderItemRepository orderItemRepository;
        @Autowired
        private UserRepository userRepository ;
        @Autowired
        private ProductRepository productRepository ;
        @Autowired
        private CartRepository cartRepository ;
        @Transactional

        public Order placeOrder(Long userId){
            // 1. get user
            User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("user not found "));

            // 2.   get cart items
            List<Cart> cartItems = cartRepository.findByUserId(userId);

            if (cartItems.isEmpty()) {
                throw new RuntimeException("Cart is empty"); // we can improve later
            }
            // 3. create Order
            Order order = new Order();
            order.setUser(user);
            double total = 0 ;
            //save first to generate id
            Order savedOrder = orderRepository.save(order);
            //looping through items
            for(Cart cart : cartItems){

                Product product = cart.getProduct();
                if (product.getStock() < cart.getQuantity()) {
                    throw new RuntimeException("Not enough stock");
                }
                product.setStock(product.getStock() - cart.getQuantity());
                // create order item
                OrderItem item = new OrderItem();
                item.setOrder(savedOrder);
                item.setProduct(product);
                item.setQuantity(cart.getQuantity());
                orderItemRepository.save(item);
                total+= product.getPrice() * item.getQuantity();

            }
            savedOrder.setTotalAmount(total);
            orderRepository.save(savedOrder);
             // clear cart
            cartRepository.deleteAll(cartItems);

            return savedOrder;

        }
        /*public List<Order> getOrdersByUser(Long userId) {
            return orderRepository.findByUser_Id(userId);
        }*/
        public List<OrderResponseDTO> getOrdersByUser(Long userId) {

            List<Order> orders = orderRepository.findByUser_Id(userId);

            return orders.stream()
                    .map(this::convertToDTO)
                    .toList();
        }

        private OrderResponseDTO convertToDTO(Order order){
            List<OrderItemDTO> items = order.getOrderItems()
                    .stream()
                    .map(item -> new OrderItemDTO(
                            item.getProduct().getName(),
                            item.getQuantity()
                    )).toList();
            return new OrderResponseDTO(
                    order.getId(),
                    order.getTotalAmount(),
                    items
            );
        }
    }
    // order , orderItem , user , product , cart ;
    // 1. fetch cart and user ;
    // 2. create order ;
    // 3.for each Item
    // * create order item
    // * reduce stock
    // 4 . calculate total
    // 5 . and place order  and clear cart ;

