/**
 * 商品信息包含属性定义
 */
export type MealDataType = {
  /**
   * 商品 id
   */
  id: string;
  /**
   * 商品标题
   */
  title: string;
  /**
   * 商品描述
   */
  desc: string;
  /**
   * 商品单价
   */
  price: number;
  /**
   * 商品图片资源路径
   */
  img: string;
  /**
   * 商品数量
   */
  count: number;
};

/**
 * 购物车包含属性定义
 */
export type CartStateType = {
  /**
   * 添加进购物车的商品
   */
  items: Array<MealDataType>;
  /**
   * 商品总数
   */
  totalCount: number;
  /**
   * 商品总价
   */
  totalAmount: number;
};

/**
 * 购物车操作函数上下文类型
 */
export type CartContextType = {
  /**
   * 购物车状态数据
   */
  cartState: CartStateType;

  /**
   * 购物车操作函数类型
   */
  setCartHandler: ((confirm: "clear") => void) &
    ((
      mealData: MealDataType,
      operationType: Readonly<"add" | "delete">
    ) => void);
};
