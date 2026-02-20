//! 企业微信集成模块
//! 
//! 为 moltis 提供企业微信消息收发能力

mod channel;
mod config;

pub use channel::WecomChannelPlugin;
pub use config::WecomConfig;

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
