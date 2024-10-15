import { Request, Response } from "express";

export function WithSecret(secret: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (req: Request, res: Response) {
      const token = req.header("authorization") || '';

      if (secret !== token) {
        return res.status(401).json({
          success: false,
          data: {
            message: "invalid token",
          },
        });
      }
      return originalMethod.apply(this, arguments);
    };
  };
}
